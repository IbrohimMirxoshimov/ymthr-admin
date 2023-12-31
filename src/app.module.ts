import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HeaderResolver } from "nestjs-i18n";
import { I18nModule } from "nestjs-i18n/dist/i18n.module";
import * as path from "path";
import { DataSource } from "typeorm";
import appConfig from "./config/app.config";
import authConfig from "./config/auth.config";
import databaseConfig from "./config/database.config";
import fileConfig from "./config/file.config";
import googleConfig from "./config/google.config";
import mailConfig from "./config/mail.config";
import { TypeOrmConfigService } from "./database/typeorm-config.service";
import { MailConfigService } from "./modules/mail/mail-config.service";

// modules
// import { ForgotModule } from './modules/forgot/forgot.module';
import { HomeModule } from "./modules/home/home.module";
import { MailModule } from "./modules/mail/mail.module";
// import { AuthGoogleModule } from './modules/auth-google/auth-google.module';
// import { UsersModule } from './modules/users/users.module';
// import { FilesModule } from './modules/files/files.module';
import { ScheduleModule } from "@nestjs/schedule";
import { LeadsModule } from "./modules/Leads/module";
import { AuthModule } from "./modules/auth/auth.module";
import { FilesModule } from "./modules/files/files.module";
import { NewsModule } from "./modules/News/module";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [
				databaseConfig,
				authConfig,
				appConfig,
				mailConfig,
				fileConfig,
				googleConfig,
			],
			envFilePath: [".env"],
		}),
		TypeOrmModule.forRootAsync({
			useClass: TypeOrmConfigService,
			dataSourceFactory: async (options) => {
				const dataSource = await new DataSource(options!).initialize();
				return dataSource;
			},
		}),
		MailerModule.forRootAsync({
			useClass: MailConfigService,
		}),
		I18nModule.forRootAsync({
			useFactory: (configService: ConfigService) => ({
				fallbackLanguage: configService.get("app.fallbackLanguage")!,
				loaderOptions: { path: path.join(__dirname, "./i18n/"), watch: true },
			}),
			resolvers: [
				{
					use: HeaderResolver,
					useFactory: (configService: ConfigService) => {
						return configService.get("app.headerLanguage");
					},
					inject: [ConfigService],
				},
			],
			imports: [ConfigModule],
			inject: [ConfigService],
		}),
		ScheduleModule.forRoot(),
		HomeModule,
		AuthModule,
		LeadsModule,
		MailModule,
		FilesModule,
		NewsModule,
	],
})
export class AppModule {}
