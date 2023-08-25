import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import {
	IsEmail,
	IsNotEmpty,
	IsOptional,
	IsString,
	MinLength,
	Validate,
} from "class-validator";
import { IsValidPhoneNumber } from "src/utils/validators/is-phone-number.validator";
import { IsExist } from "../../../utils/validators/is-exists.validator";
import { IsNotExist } from "../../../utils/validators/is-not-exists.validator";
import { Role } from "../../roles/entities/role.entity";

export class CreateUserDto {
	@ApiProperty({ example: "test1@example.com" })
	@Transform(({ value }) => value?.toLowerCase().trim())
	@IsNotEmpty()
	@Validate(IsNotExist, ["User"], {
		message: "emailAlreadyExists",
	})
	@IsEmail()
	email?: string;

	@ApiProperty()
	@MinLength(6)
	password?: string;

	provider?: string;

	social_id?: string;

	@ApiProperty({ example: "John" })
	@IsNotEmpty()
	first_name: string;

	@ApiProperty({ example: "Doe" })
	@IsNotEmpty()
	last_name: string;

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	photo_id?: string;

	@ApiProperty()
	@IsValidPhoneNumber({
		message: "Wrong phone number format!",
	})
	phone_number?: string;

	@ApiProperty({ type: Role })
	@Validate(IsExist, ["Role", "id"], {
		message: "roleNotExists",
	})
	role?: Role;

	status?: number;
	hash?: string;
}
