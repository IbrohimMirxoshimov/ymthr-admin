import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { paginatedResponse } from "src/utils/response.utils";
import { getPaginationOptions } from "src/utils/typeorm.utils";
import { GetListQuery } from "src/utils/types/express.type";
import { Repository } from "typeorm";
import { LeadEntity } from "./entities/leads.entity";
import { CreateLeadDto } from "./leads.dto";
import { EntityCondition } from "src/utils/types/entity-condition.type";

@Injectable()
export class LeadService {
	constructor(
		@InjectRepository(LeadEntity)
		private repository: Repository<LeadEntity>
	) {}

	async getList(query: GetListQuery) {
		return paginatedResponse(
			await this.repository.findAndCount(getPaginationOptions(query)),
			query
		);
	}

	findOne(fields: EntityCondition<LeadEntity>) {
		return this.repository.findOne({
			where: fields,
		});
	}

	async create(dto: CreateLeadDto) {
		return this.repository.save(this.repository.create(dto));
	}
}
