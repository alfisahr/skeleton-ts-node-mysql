import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column({
      type: 'text',
   })
   title: string;

   @Column({
      type: 'text',
   })
   content: string;
}