import {
   Column,
   CreateDateColumn,
   Entity, JoinTable, ManyToMany,
   ManyToOne,
   PrimaryGeneratedColumn,
   UpdateDateColumn,
} from 'typeorm';
import { User } from './User';
import { Category } from './Category';

@Entity()
export class Post {
   @PrimaryGeneratedColumn()
   id: number;

   @CreateDateColumn()
   createdAt: string;

   @UpdateDateColumn()
   updatedAt: string;

   @Column()
   title: string;

   @ManyToMany(() => Category, (category) => category.id)
   @JoinTable()
   categories: Category[];

   @Column({
      type: 'mediumtext',
   })
   excerpt: string;

   @Column({
      type: 'text',
   })
   content: string;

   @ManyToOne(() => User, (user) => user.posts)
   author: User;

   @Column({
      type: 'boolean',
   })
   isPublished: boolean;
}