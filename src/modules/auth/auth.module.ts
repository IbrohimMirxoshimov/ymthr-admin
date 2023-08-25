import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { ForgotModule } from "src/modules/forgot/forgot.module";
import { MailModule } from "src/modules/mail/mail.module";
import { UsersModule } from "src/modules/users/users.module";
import { IsExist } from "src/utils/validators/is-exists.validator";
import { IsNotExist } from "src/utils/validators/is-not-exists.validator";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AnonymousStrategy } from "./strategies/anonymous.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Module({
	imports: [
		UsersModule,
		ForgotModule,
		PassportModule,
		MailModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				secret: configService.get("auth.secret"),
				signOptions: {
					expiresIn: configService.get("auth.expires"),
				},
			}),
		}),
	],
	controllers: [AuthController],
	providers: [IsExist, IsNotExist, AuthService, JwtStrategy, AnonymousStrategy],
	exports: [AuthService],
})
export class AuthModule {}
