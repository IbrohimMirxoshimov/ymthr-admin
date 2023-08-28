import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { MinLength } from "class-validator";

export class NewsCreateDto {
	@ApiProperty()
	@MinLength(1)
	@Transform(({ value }) => value?.trim())
	title: string;

	@ApiProperty()
	@MinLength(1)
	@Transform(({ value }) => value?.trim())
	description: string;

	@ApiProperty()
	@MinLength(1)
	@Transform(({ value }) => value?.trim())
	category: string;
}
