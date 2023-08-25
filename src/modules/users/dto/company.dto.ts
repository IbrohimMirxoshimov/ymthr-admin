import { ApiProperty } from "@nestjs/swagger";
import { MinLength } from "class-validator";

export class UpdateCompanyInfoDto {
	@ApiProperty()
	@MinLength(1)
	terms: string;

	@ApiProperty()
	@MinLength(1)
	policy: string;
}
