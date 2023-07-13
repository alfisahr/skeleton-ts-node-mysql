import { Sequelize } from "sequelize";
import mysql from "mysql2/promise";

interface DBConfig {
  host: string | undefined;
  username: string | undefined;
  password: string | undefined;
  port: number | undefined;
  name: string | undefined;
}

class Database {
  connectionString: string;
  constructor(public config: DBConfig) {
    this.connectionString = `mysql://${config.username}:${config.password}@${config.host}:${config.port}/${config.name}`;
  }

  createDb = async () => {
    const { username, password, host, port, name } = this.config;
    const connection = await mysql.createConnection({
      host,
      port,
      user: username,
      password,
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${name}\`;`);
  };

  instance() {
    this.createDb();
    return new Sequelize(this.connectionString);
  }

  connect = async () => {
    try {
      await this.instance().authenticate();
      console.log("Successfully connect to ORM DB");
    } catch (err) {
      console.log(err);
    }
  };
}

export default Database;
