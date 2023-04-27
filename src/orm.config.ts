import { SnakeNamingStrategy } from './snake-naming.strategy';
import { join } from "path";

module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: 8889,
  username: 'root',
  password: 'root',
  database: 'nestjs-multi-tenant',
  synchronize:true,
  namingStrategy: new SnakeNamingStrategy(),
  logging: true,
  keepConnectionAlive:true,
  autoLoadEntities: true,
  entities: [join(__dirname, './modules/public/**/*.entity{.ts,.js}')],
  //migrations: [join(__dirname, './migrations/public/*{.ts,.js}')],
};
