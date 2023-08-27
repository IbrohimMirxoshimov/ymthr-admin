import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { SignInResponse } from "./auth.classes";
import { AuthService } from "./auth.service";
import { AuthEmailLoginDto } from "./dto/auth-email-login.dto";

@ApiTags("Auth")
@Controller({
	path: "auth",
})
export class AuthController {
	constructor(public service: AuthService) {}

	@ApiOkResponse({
		type: SignInResponse,
	})
	@Post("signin")
	@HttpCode(HttpStatus.OK)
	public async login(@Body() loginDto: AuthEmailLoginDto) {
		return this.service.validateLogin(loginDto);
	}

	// @Post("register")
	// @HttpCode(HttpStatus.CREATED)
	// async register(@Body() createUserDto: AuthRegisterLoginDto) {
	// 	return this.service.register(createUserDto);
	// }

	// @Post("confirm")
	// @HttpCode(HttpStatus.OK)
	// async confirmEmail(@Body() confirmEmailDto: AuthConfirmEmailDto) {
	// 	return this.service.confirmEmail(confirmEmailDto.hash);
	// }

	// @Post("is-user-exist")
	// @HttpCode(HttpStatus.OK)
	// async isUserExist(@Body() dto: AuthForgotPasswordDto) {
	// 	return this.service.isUserExist(dto.email);
	// }

	// @Post("forgot/password")
	// @HttpCode(HttpStatus.OK)
	// async forgotPassword(@Body() forgotPasswordDto: AuthForgotPasswordDto) {
	// 	return this.service.forgotPassword(forgotPasswordDto.email);
	// }

	// @Post("reset/password")
	// @HttpCode(HttpStatus.OK)
	// async resetPassword(@Body() resetPasswordDto: AuthResetPasswordDto) {
	// 	return this.service.resetPassword(
	// 		resetPasswordDto.hash,
	// 		resetPasswordDto.password
	// 	);
	// }
}
