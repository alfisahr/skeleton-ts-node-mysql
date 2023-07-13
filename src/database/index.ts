import environment from '../config/environment';
import { DataSource } from 'typeorm';
import { Post } from '../entity/Post';

const { username, password, host, port, name: database } = environment.database('development');
export const AppDataSource = new DataSource({
   type: 'mysql',
   host,
   port,
   username,
   password,
   entities: [Post],
   database,
   synchronize: true,
});