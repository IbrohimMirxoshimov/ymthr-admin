import { Transform } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsString, MinLength } from "class-validator";

export class NewsCreateDto {
	@ApiProperty()
	@MinLength(1)
	@Transform(({ value }) => value?.toLowerCase().trim())
	name: string;

	@ApiProperty()
	@MinLength(1)
	@Transform(({ value }) => value?.toLowerCase().trim())
	text: string;

	@ApiPropertyOptional()
	@IsArray()
	@IsString({
		each: true,
	})
	@Transform(({ value }) => {
		if (value) {
			return value.map((v: string) => v.toLowerCase().trim());
		}

		return [];
	})
	tags: string[];
}
