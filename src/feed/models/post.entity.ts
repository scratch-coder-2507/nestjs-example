/* eslint-disable prettier/prettier */
import { UserEntity } from 'src/auth/models/user.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity('feed_post')
export class FeedPostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  body: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  userId: number;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.feedPosts)
  author: UserEntity;
}
