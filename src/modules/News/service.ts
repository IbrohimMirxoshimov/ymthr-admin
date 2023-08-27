import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { paginatedResponse } from "src/utils/response.utils";
import { getPaginationOptions } from "src/utils/typeorm.utils";
import { EntityCondition } from "src/utils/types/entity-condition.type";
import { GetListQuery } from "src/utils/types/express.type";
import { Repository } from "typeorm";
import { NewsCreateDto } from "./dto/create.dto";
import { NewsEntity } from "./entities/news.entity";

@Injectable()
export class NewsService {
	constructor(
		@InjectRepository(NewsEntity)
		private repository: Repository<NewsEntity>
	) {}

	create(dto: NewsCreateDto) {
		return this.repository.save(this.repository.create(dto));
	}

	async getList(query: GetListQuery) {
		return paginatedResponse(
			await this.repository.findAndCount({
				...getPaginationOptions(query),
			}),
			query
		);
	}

	findOne(fields: EntityCondition<NewsEntity>) {
		return this.repository.findOne({
			where: fields,
		});
	}

	update(id: number, dto: NewsCreateDto) {
		return this.repository.save(
			this.repository.create({
				id,
				...dto,
			})
		);
	}

	async softDelete(id: number): Promise<void> {
		await this.repository.softDelete(id);
	}
}
