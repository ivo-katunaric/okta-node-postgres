import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import glob from 'glob';

import { AuthMiddleware } from './auth.module/auth-middleware';

const controllers =
  glob.sync('*.module/*-controller.ts', { cwd: __dirname, absolute: true })
    .map(require)
    .map(imported => imported.default);

@Module({
  controllers
})
export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer.apply(cookieParser(), AuthMiddleware).forRoutes('/');
  }
}
