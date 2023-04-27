import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TenantsModule } from "./modules/public/tenants/tenants.module";
import { TenancyModule } from "./modules/tenancy/tenancy.module";
import { CatsModule } from "./modules/tenanted/cats/cats.module";
import * as ormconfig from './orm.config';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: "mysql",
    //   host: "localhost",
    //   port: 8889,
    //   username: "root",
    //   password: "root",
    //   database: "nestjs-multi-tenant",
    //   autoLoadEntities: true,
    //   synchronize: true,
    //   entities: [join(__dirname, "./modules/public/**/*.entity{.ts,.js}")]
    // }),
    TypeOrmModule.forRoot(ormconfig),
    TenantsModule,
    TenancyModule,
    CatsModule
  ]
})
export class AppModule {
}
