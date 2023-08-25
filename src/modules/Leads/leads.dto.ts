import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, MinLength } from "class-validator";

export class CreateLeadDto {
	@ApiProperty()
	@MinLength(1)
	name: string;

	@ApiProperty()
	@IsEmail()
	email: string;

	@ApiProperty()
	@MinLength(1)
	text: string;
}
