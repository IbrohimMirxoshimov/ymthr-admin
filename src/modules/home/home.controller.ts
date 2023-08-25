import { Body, Controller, Get, Patch, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { UpdateCompanyInfoDto } from "../users/dto/company.dto";
import { HomeService } from "./home.service";
import { AuthGuard } from "@nestjs/passport";

@ApiTags("Home")
@Controller()
export class HomeController {
	constructor(private service: HomeService) {}

	@Get()
	appInfo() {
		return this.service.appInfo();
	}

	@Get("/company")
	getCompanyInfo() {
		return this.service.getCompanyInfo();
	}

	@ApiBearerAuth()
	@UseGuards(AuthGuard("jwt"))
	@Put("/company")
	updateCompanyInfo(@Body() dto: UpdateCompanyInfoDto) {
		return this.service.updateCompanyInfo(dto);
	}
}
