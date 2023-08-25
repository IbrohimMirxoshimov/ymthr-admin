import { ConfigService } from '@nestjs/config';

export function generateFrontendConfirmEmailUrl(
  hash: string,
  configService: ConfigService,
) {
  return `${configService.get(
    'app.frontendDomain',
  )}/auth/confirm-email/${hash}`;
}

export function generateFrontendChangePasswordUrl(
  hash: string,
  configService: ConfigService,
) {
  return `${configService.get(
    'app.frontendDomain',
  )}/auth/password-change/${hash}`;
}

export function generateCustomerConfirmEmailUrl(
  hash: string,
  configService: ConfigService,
) {
  return `${configService.get(
    'app.publicFrontendDomain',
  )}/confirm-customer-email/${hash}`;
}
