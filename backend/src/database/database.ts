import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "atividadequatro",
    password: "123",
    database: "atividade",
    synchronize: true,
    logging: false,
    entities: ["src/models/*.ts"],
    subscribers: [],
    migrations: [],
})