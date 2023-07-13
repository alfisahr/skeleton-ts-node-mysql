import * as dotenv from "dotenv";

interface EnvironmentType {
  nodeEnv: string | undefined;
  port: number;
  database: (environment: string) => DBConfig;
  db_driver: string | undefined;
}

interface DBConfig {
  host: string;
  username: string;
  password: string;
  port: number;
  name: string;
}

dotenv.config();

const environment: EnvironmentType = {
  nodeEnv: process.env.NODE_ENV,
  port: parseInt(<string>process.env.SERVER_PORT, 10) | 5000,
  database: (environment) => {
    const { env } = process;
    const currentEnv = environment.toUpperCase();
    return {
      username: env[`DB_${currentEnv}_USERNAME`] ?? env.DB_USERNAME,
      password: env[`DB_${currentEnv}_PASSWORD`] ?? env.DB_PASSWORD,
      port: env[`DB_${currentEnv}_PORT`]
        ? parseInt(<string>env[`DB_${currentEnv}_PORT`])
        : parseInt(<string>env.DB_PORT),
      host: env[`DB_${currentEnv}_HOST`] ?? env.DB_HOST,
      name: env[`DB_${currentEnv}_NAME`] ?? env.DB_NAME,
    };
  },
  db_driver: process.env.DB_DRIVER,
};

export default environment;
