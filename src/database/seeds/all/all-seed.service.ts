import { Injectable } from "@nestjs/common";
import user_statuses from "src/constants/user_statuses";
import { Role } from "src/modules/roles/entities/role.entity";
import { SystemRolesEnum } from "src/modules/roles/roles.enum";
import { User } from "src/modules/users/entities/user.entity";
import { DataSource } from "typeorm";

@Injectable()
export class AllSeedService {
	constructor(private datasource: DataSource) {}

	async synchronizeDb() {
		return this.datasource.synchronize();
	}
	async seedRoleAndUser() {
		await this.datasource.manager.getRepository(Role).save(
			Role.create([
				{
					name: "User",
					system: SystemRolesEnum.SUPER_ADMIN,
				},
			])
		);

		await this.datasource.manager.getRepository(User).save(
			User.create([
				{
					first_name: "Super",
					last_name: "Admin",
					email: "admin@example.com",
					password: "secret",
					role: {
						id: 1,
					},

					status: user_statuses.ACTIVE,
				},
			])
		);
	}
}
