import { ApiProperty } from "@nestjs/swagger";
import { Allow } from "class-validator";
import {
	AfterInsert,
	AfterLoad,
	BaseEntity,
	Column,
	Entity,
	PrimaryGeneratedColumn,
} from "typeorm";
import appConfig from "../../../config/app.config";

@Entity({ name: "file" })
export class FileEntity extends BaseEntity {
	@ApiProperty({ example: "cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae" })
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Allow()
	@Column()
	path: string;

	@Column({ default: "" })
	name: string;

	@Column({ default: 0 })
	size: number;

	@Column({ default: 0 })
	sort: number;

	@AfterLoad()
	@AfterInsert()
	updatePath() {
		if (this.path.indexOf("/") === 0) {
			this.path = appConfig().backendDomain + this.path;
		}
	}
}
