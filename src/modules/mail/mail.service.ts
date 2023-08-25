import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { I18n, I18nService } from "nestjs-i18n";
import { MailData } from "./interfaces/mail-data.interface";
import {
	generateFrontendChangePasswordUrl,
	generateFrontendConfirmEmailUrl,
} from "./utils";

@Injectable()
export class MailService {
	constructor(
		@I18n()
		private i18n: I18nService,
		private mailerService: MailerService,
		private configService: ConfigService
	) {}

	async userSignUp(mailData: MailData<{ hash: string }>) {
		try {
			await this.mailerService.sendMail({
				to: mailData.to,
				subject: await this.i18n.t("common.confirmEmail"),
				text: `${generateFrontendConfirmEmailUrl(
					mailData.data.hash,
					this.configService
				)} ${await this.i18n.t("common.confirmEmail")}`,
				template: "activation",
				context: {
					title: await this.i18n.t("common.confirmEmail"),
					url: generateFrontendConfirmEmailUrl(
						mailData.data.hash,
						this.configService
					),
					actionTitle: await this.i18n.t("common.confirmEmail"),
					app_name: this.configService.get("app.name"),
					text1: await this.i18n.t("confirm-email.text1"),
					text2: await this.i18n.t("confirm-email.text2"),
					text3: await this.i18n.t("confirm-email.text3"),
				},
			});
		} catch (error) {
			console.error(error);
		}
	}

	async customerSignUp(mailData: MailData<{ code: string }>) {
		await this.mailerService.sendMail({
			to: mailData.to,
			subject: await this.i18n.t("common.confirmEmail"),
			text: "",
			template: "activation",
			context: {
				title: await this.i18n.t("common.confirmEmail"),
				url: "",
				actionTitle: await this.i18n.t("common.confirmEmail"),
				app_name: mailData.data.code,
				text1: "",
				text2: "",
				text3: "",
			},
		});
	}

	async forgotPassword(mailData: MailData<{ hash: string }>) {
		await this.mailerService.sendMail({
			to: mailData.to,
			subject: await this.i18n.t("common.resetPassword"),
			text: await this.i18n.t("common.resetPassword"),
			template: "reset-password",
			context: {
				title: await this.i18n.t("common.resetPassword"),
				url: generateFrontendChangePasswordUrl(
					mailData.data.hash,
					this.configService
				),
				actionTitle: await this.i18n.t("common.resetPassword"),
				app_name: this.configService.get("app.name"),
				text1: await this.i18n.t("reset-password.text1"),
				text2: await this.i18n.t("reset-password.text2"),
				text3: await this.i18n.t("reset-password.text3"),
				text4: await this.i18n.t("reset-password.text4"),
			},
		});
	}
}
