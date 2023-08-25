import { Transform } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { MinLength } from "class-validator";

export class NewsCreateDto {
	@ApiProperty()
	@MinLength(1)
	@Transform(({ value }) => value?.toLowerCase().trim())
	name: string;

	@ApiProperty()
	@MinLength(1)
	@Transform(({ value }) => value?.toLowerCase().trim())
	text: string;

	@ApiProperty()
	@MinLength(1)
	@Transform(({ value }) => value?.toLowerCase().trim())
	tag: string;
}
