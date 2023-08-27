import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
	Query,
	UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { GetListQuery } from "src/utils/types/express.type";
import { CreateLeadDto } from "./leads.dto";
import { LeadService } from "./service";

@ApiTags("Leads")
@Controller({
	path: "leads",
})
export class LeadsController {
	constructor(private readonly service: LeadService) {}
	@Get()
	@HttpCode(HttpStatus.OK)
	@ApiBearerAuth()
	@UseGuards(AuthGuard("jwt"))
	async getList(@Query() query: GetListQuery) {
		return this.service.getList(query);
	}

	@Get(":id")
	@HttpCode(HttpStatus.OK)
	findOne(@Param("id") id: string) {
		return this.service.findOne({ id: +id });
	}

	@Post()
	@HttpCode(HttpStatus.OK)
	async create(@Body() dto: CreateLeadDto) {
		return this.service.create(dto);
	}
}
