import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { UpdateCompanyInfoDto } from "../users/dto/company.dto";
import { DataSource } from "typeorm";
import { User } from "../users/entities/user.entity";
import { SystemRolesEnum } from "../roles/roles.enum";

@Injectable()
export class HomeService {
	constructor(
		private configService: ConfigService,
		private datasource: DataSource
	) {}

	appInfo() {
		return { name: this.configService.get("app.name"), version: "0.1.0" };
	}

	async updateCompanyInfo(dto: UpdateCompanyInfoDto) {
		const userRepo = this.datasource.manager.getRepository(User);

		const admin = await userRepo.findOne({
			loadEagerRelations: true,
			where: {
				role: {
					system: SystemRolesEnum.SUPER_ADMIN,
				},
			},
		});

		if (!admin) {
			throw new InternalServerErrorException();
		}

		admin.company_info = dto;

		await admin.save();

		return dto;
	}

	async getCompanyInfo() {
		const userRepo = this.datasource.manager.getRepository(User);

		const admin = await userRepo.findOne({
			loadEagerRelations: true,
			where: {
				role: {
					system: SystemRolesEnum.SUPER_ADMIN,
				},
			},
		});

		if (!admin) {
			throw new InternalServerErrorException();
		}

		return admin.company_info;
	}
}
