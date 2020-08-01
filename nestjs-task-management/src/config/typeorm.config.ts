import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export const typeOrmConfig : TypeOrmModuleOptions  ={
    type: 'oracle',
    connectString: "(DESCRIPTION =(ADDRESS_LIST =(ADDRESS = (PROTOCOL = TCP)(Host = localhost)(Port = 1522)))(CONNECT_DATA =(sid = taskmanageme)(SERVER=dedicated)))",
    username: 'ORACLE_OCM',
    password: 'hiu5Voiw',
    database: 'ORACLE_OCM',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
    retryAttempts: 1,
};
