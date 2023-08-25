import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityCondition } from "src/utils/types/entity-condition.type";
import { IPaginationOptions } from "src/utils/types/pagination-options";
import { FindOptionsRelations, Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private usersRepository: Repository<User>
	) {}

	create(createProfileDto: CreateUserDto) {
		return this.usersRepository.save(
			this.usersRepository.create(createProfileDto)
		);
	}

	findManyWithPagination(paginationOptions: IPaginationOptions) {
		return this.usersRepository.findAndCount({
			skip: (paginationOptions.page - 1) * paginationOptions.limit,
			take: paginationOptions.limit,
		});
	}

	findOne(
		fields: EntityCondition<User>,
		reletions?: FindOptionsRelations<User>
	) {
		return this.usersRepository.findOne({
			where: fields,
			relations: reletions,
		});
	}

	update(id: number, updateProfileDto: UpdateUserDto) {
		return this.usersRepository.save(
			this.usersRepository.create({
				id,
				...updateProfileDto,
			})
		);
	}

	isUserExist(email: string) {
		return this.usersRepository.findOne({
			select: ["id"],
			where: {
				email,
			},
		});
	}

	async softDelete(id: number): Promise<void> {
		await this.usersRepository.softDelete(id);
	}
}
