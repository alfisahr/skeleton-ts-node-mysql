import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './Post';

enum Gender {
   male = 'Male', female = 'Female'
}

@Entity()
export class User {
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   name: string;

   @Column()
   email: string;

   @Column({
      type: 'enum',
      enum: Gender,
      default: Gender.male,
   })
   gender: Gender;

   @Column()
   password: string;

   @Column({
      type: 'boolean',
      default: true,
   })
   isActive: boolean;

   @OneToMany(() => Post, (post) => post.author)
   posts: Post[];
}