import environment from '../config/environment';
import { DataSource } from 'typeorm';
import { Post } from '../entity/Post';
import { User } from '../entity/User';
import { Category } from '../entity/Category';

const { username, password, host, port, name: database } = environment.database('development');
export const AppDataSource = new DataSource({
   type: 'mysql',
   host,
   port,
   username,
   password,
   entities: [Post, User, Category],
   entitySkipConstructor: false,
   database,
   synchronize: true,
});