import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

console.log('Environment value',process.env.NODE_ENV.length);
const dbConfig = config.db;
console.log('dbconfig', dbConfig);
export const typeOrmConfig : TypeOrmModuleOptions  ={
    type: dbConfig.type,
    connectString: "(DESCRIPTION =(ADDRESS_LIST =(ADDRESS = (PROTOCOL = TCP)(Host = localhost)(Port = 1522)))(CONNECT_DATA =(sid = taskmanageme)(SERVER=dedicated)))",
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
    retryAttempts: 1,
};
