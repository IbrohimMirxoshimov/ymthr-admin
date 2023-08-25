import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
	Query,
	DefaultValuePipe,
	ParseIntPipe,
	HttpStatus,
	HttpCode,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "src/modules/roles/roles.guard";
import { inifinityPaginatedResponse } from "src/utils/infinity-pagination";
import { NewsCreateDto } from "./dto/create.dto";
import { NewsService } from "./service";
import { GetListQuery } from "src/utils/types/express.type";

@ApiTags("News")
@Controller({
	path: "news",
	version: "1",
})
export class MainController {
	constructor(private readonly service: NewsService) {}

	@Get()
	@HttpCode(HttpStatus.OK)
	async getList(@Query() query: GetListQuery) {
		return this.service.getList(query);
	}

	@Get(":id")
	@HttpCode(HttpStatus.OK)
	findOne(@Param("id") id: string) {
		return this.service.findOne({ id: +id });
	}

	@ApiBearerAuth()
	@UseGuards(AuthGuard("jwt"))
	@Post()
	@HttpCode(HttpStatus.CREATED)
	create(@Body() dto: NewsCreateDto) {
		return this.service.create(dto);
	}

	@ApiBearerAuth()
	@UseGuards(AuthGuard("jwt"))
	@Patch(":id")
	@HttpCode(HttpStatus.OK)
	update(@Param("id") id: number, @Body() dto: NewsCreateDto) {
		return this.service.update(id, dto);
	}

	@ApiBearerAuth()
	@UseGuards(AuthGuard("jwt"))
	@Delete(":id")
	remove(@Param("id") id: number) {
		return this.service.softDelete(id);
	}
}
