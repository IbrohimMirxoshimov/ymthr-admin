import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { FileEntity } from "./entities/file.entity";

@Injectable()
export class FilesService {
	constructor(
		private readonly configService: ConfigService,
		@InjectRepository(FileEntity)
		private fileRepository: Repository<FileEntity>,

		private dataSource: DataSource
	) {}

	async uploadFile(file: any, user_id?: number): Promise<FileEntity> {
		if (!file) {
			throw new HttpException(
				{
					status: HttpStatus.UNPROCESSABLE_ENTITY,
					errors: {
						file: "selectFile",
					},
				},
				HttpStatus.UNPROCESSABLE_ENTITY
			);
		}

		let property_id: number | undefined;

		if (user_id) {
			const [user] = await this.dataSource.query(
				"select primary_property_id from users where id = $1",
				[user_id]
			);
			property_id = user.primary_property_id;
		}

		return this.fileRepository.save(
			this.fileRepository.create({
				name: file.originalname,
				size: file.size,
				path: `/${this.configService.get("app.apiPrefix")}/v1/${file.path}`,
			})
		);
	}

	async delete(id: string): Promise<void> {
		const file = await this.fileRepository.findBy({
			id: id,
		});

		if (file) {
			await this.fileRepository.delete(id);
		}
	}
}
