import {
	HttpException,
	HttpStatus,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { randomStringGenerator } from "@nestjs/common/utils/random-string-generator.util";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import * as crypto from "crypto";
import user_statuses from "src/constants/user_statuses";
import { ForgotService } from "src/modules/forgot/forgot.service";
import { MailService } from "src/modules/mail/mail.service";
import { Role } from "src/modules/roles/entities/role.entity";
import { SystemRolesEnum } from "src/modules/roles/roles.enum";
import { UsersService } from "src/modules/users/users.service";
import { DataSource, FindOptionsWhere } from "typeorm";
import { User } from "../users/entities/user.entity";
import { AuthEmailLoginDto, AuthResponse } from "./dto/auth-email-login.dto";
import { AuthRegisterLoginDto } from "./dto/auth-register-login.dto";
import { generateJWT } from "./utils";

@Injectable()
export class AuthService {
	constructor(
		private jwtService: JwtService,
		private usersService: UsersService,
		private forgotService: ForgotService,
		private mailService: MailService,
		private datasource: DataSource
	) {}

	async validateLogin(loginDto: AuthEmailLoginDto): Promise<AuthResponse> {
		const findOptions: FindOptionsWhere<User> = {};

		findOptions.status = user_statuses.ACTIVE;

		findOptions.email = loginDto.username;

		const user = await this.usersService.findOne(findOptions, {
			role: true,
		});

		if (!user || !user.password) {
			throw new NotFoundException({
				status: 404,
			});
		}

		const isValidPassword = await bcrypt.compare(
			loginDto.password,
			user.password
		);

		if (isValidPassword) {
			const token = generateJWT(user, this.jwtService);

			return { token, user: user, expires: this.getExpireTime() };
		} else {
			throw new HttpException(
				{
					status: HttpStatus.UNPROCESSABLE_ENTITY,
					errors: {
						message: "incorrectCredentials",
					},
				},
				HttpStatus.UNPROCESSABLE_ENTITY
			);
		}
	}

	async register(dto: AuthRegisterLoginDto): Promise<void> {
		const hash = crypto
			.createHash("sha256")
			.update(randomStringGenerator())
			.digest("hex");

		this.mailService.userSignUp({
			to: dto.email,
			data: {
				hash,
			},
		});

		const role = await this.datasource
			.getRepository(Role)
			.findOneBy({ system: SystemRolesEnum.OWNER });

		await this.usersService.create({
			...dto,
			email: dto.email,
			role: role!,
			hash,
			status: user_statuses.DRAFT,
		});
	}

	async confirmEmail(hash: string): Promise<AuthResponse> {
		const user = await this.usersService.findOne(
			{
				hash,
			},
			{
				role: true,
			}
		);

		if (!user) {
			throw new HttpException(
				{
					status: HttpStatus.NOT_FOUND,
					error: `notFound`,
				},
				HttpStatus.NOT_FOUND
			);
		}

		user.hash = "";
		user.status = user_statuses.ACTIVE;
		await user.save();

		return {
			user: user,
			token: generateJWT(user, this.jwtService),
			expires: this.getExpireTime(),
		};
	}

	async forgotPassword(email: string): Promise<void> {
		const user = await this.usersService.findOne({
			email,
		});

		if (!user) {
			throw new HttpException(
				{
					status: HttpStatus.UNPROCESSABLE_ENTITY,
					errors: {
						email: "emailNotExists",
					},
				},
				HttpStatus.UNPROCESSABLE_ENTITY
			);
		}

		const hash = crypto
			.createHash("sha256")
			.update(randomStringGenerator())
			.digest("hex");

		await this.forgotService.create({
			hash,
			user,
		});

		await this.mailService.forgotPassword({
			to: email,
			data: {
				hash,
			},
		});
	}

	async isUserExist(email: string): Promise<void> {
		const user = await this.usersService.isUserExist(email);

		if (!user) {
			throw new NotFoundException();
		}
	}

	async resetPassword(hash: string, password: string) {
		const forgot = await this.forgotService.findOne({
			where: {
				hash,
			},
		});

		if (!forgot) {
			throw new HttpException(
				{
					status: HttpStatus.UNPROCESSABLE_ENTITY,
					errors: {
						hash: `notFound`,
					},
				},
				HttpStatus.UNPROCESSABLE_ENTITY
			);
		}

		const user = forgot.user;
		user.hash = "";
		user.status = user_statuses.ACTIVE;
		user.password = password;

		await user.save();
		await this.forgotService.softDelete(forgot.id);
	}

	getExpireTime() {
		return 10 * 24 * 60 * 60 * 1000 + new Date().getTime();
	}
}
