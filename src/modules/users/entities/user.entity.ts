import { ApiPropertyOptional } from "@nestjs/swagger";
import * as bcrypt from "bcryptjs";
import { IsIn, ValidateNested } from "class-validator";
import user_statuses from "src/constants/user_statuses";
import { AuthProvidersEnum } from "src/modules/auth/auth-providers.enum";
import { GenderEnum } from "src/utils/types/other.types";
import {
	AfterLoad,
	BaseEntity,
	BeforeInsert,
	BeforeUpdate,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { FileEntity } from "../../files/entities/file.entity";
import { Role } from "../../roles/entities/role.entity";
import { UserLangEnum } from "../dto/update-user.dto";
import { UpdateCompanyInfoDto } from "../dto/company.dto";

@Entity({
	name: "users",
})
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true, nullable: true })
	email?: string;

	@Column({ nullable: true })
	password: string;

	public previousPassword: string;

	@AfterLoad()
	public loadPreviousPassword(): void {
		this.previousPassword = this.password;
	}

	@BeforeInsert()
	@BeforeUpdate()
	async setPassword() {
		if (this.password && this.previousPassword !== this.password) {
			const salt = await bcrypt.genSalt();
			this.password = await bcrypt.hash(this.password, salt);
		}
	}

	@Column({ default: AuthProvidersEnum.email })
	provider: string;

	@Index()
	@Column({ nullable: true })
	social_id?: string;

	@Index()
	@Column()
	first_name: string;

	@Index()
	@Column({ nullable: true })
	last_name?: string;

	@ApiPropertyOptional({ type: Role })
	@ManyToOne(() => Role)
	@ValidateNested()
	role: Role;

	@Column({ nullable: true })
	@Index()
	hash?: string;

	@Column({
		type: "jsonb",
		default: "{}",
	})
	company_info: UpdateCompanyInfoDto;

	@Column({ nullable: true })
	@IsIn(Object.values(user_statuses), { message: "Invalid user status" })
	status?: number;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@DeleteDateColumn()
	deletedAt: Date;
}
