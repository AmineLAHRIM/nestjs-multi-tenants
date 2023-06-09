import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getConnection, getManager } from 'typeorm';
import { getTenantConnection } from './modules/tenancy/tenancy.utils';
import { tenancyMiddleware } from './modules/tenancy/tenancy.middleware';
import { NestExpressApplication } from "@nestjs/platform-express";
import { INestApplication, Logger, ValidationPipe, VersioningType } from "@nestjs/common";

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule, {
  });
  _initConfig(app);

  app.use(tenancyMiddleware);

  //await getConnection().runMigrations()

  const schemas = await getManager().query('select schema_name as name from information_schema.schemata;');

  for (let i = 0; i < schemas.length; i += 1) {
    const { name: schema } = schemas[i];

    if (schema.startsWith('appy_admin_tenant_')) {
      const tenantId = schema.replace('appy_admin_tenant_', '');
      const connection = await getTenantConnection(tenantId);
      // await connection.runMigrations()
      await connection.close();
    }
  }

  await app.listen(3000);
}

function _initConfig(app: INestApplication) {
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.enableCors();
}

bootstrap();
