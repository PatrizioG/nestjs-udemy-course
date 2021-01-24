import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const TypeOrmConfig: TypeOrmModuleOptions =
{
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "taskmanagement",
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  //logging: true,
  synchronize: true
}