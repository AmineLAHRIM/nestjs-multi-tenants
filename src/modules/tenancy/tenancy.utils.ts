import { Connection, createConnection, getConnectionManager } from "typeorm";

import * as tenantsOrmconfig from "../../tenants-orm.config";
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

export async function getTenantConnection(tenantId: string): Promise<Connection> {
  const connectionName = `appy_admin_tenant_${tenantId}`;
  const connectionManager = getConnectionManager();

  if (connectionManager.has(connectionName)) {
    const connection = connectionManager.get(connectionName);
    return Promise.resolve(connection.isConnected ? connection : connection.connect());
  }


  return  createConnection({
    ...(tenantsOrmconfig as MysqlConnectionOptions),
    database: connectionName,
    name: connectionName
  });
}
