import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV,
  production: process.env.NODE_ENV === 'production',
  name: process.env.APP_NAME,
  workingDirectory: process.env.PWD || process.cwd(),
  frontendDomain: process.env.FRONTEND_DOMAIN,
  publicFrontendDomain: process.env.FRONTEND_DOMAIN,
  // process.env.PUBLIC_FRONTEND_DOMAIN,
  backendDomain: process.env.BACKEND_DOMAIN,
  port: parseInt(process.env.APP_PORT! || process.env.PORT!, 10) || 3000,
  apiPrefix: process.env.API_PREFIX || 'api',
  fallbackLanguage: process.env.APP_FALLBACK_LANGUAGE || 'ru',
  headerLanguage: process.env.APP_HEADER_LANGUAGE || 'x-custom-lang',
}));
