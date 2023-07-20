import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { FeedPostEntity } from '../models/post.entity';
import { FeedPost } from '../models/post.interface';
import { Observable, from } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/auth/models/user.entity';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(FeedPostEntity)
    private readonly feedPostRepository: Repository<FeedPostEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  // createPostt(feedPost: FeedPost): Observable<FeedPost> {
  //   return from(this.feedPostRepository.save(feedPost));
  // }

  async createPost(createPostDto: FeedPost): Promise<FeedPost> {
    const { body, userId } = createPostDto;

    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const post = new FeedPostEntity();
    post.body = body;
    post.author = user;
    post.userId = userId;

    return this.feedPostRepository.save(post);
  }

  findAllPosts(): Observable<FeedPost[]> {
    return from(this.feedPostRepository.find());
  }

  findPosts(take = 10, skip = 0): Observable<FeedPost[]> {
    return from(
      this.feedPostRepository.findAndCount({ take, skip }).then(([posts]) => {
        return <FeedPost[]>posts;
      }),
    );
  }

  updatePost(id: number, feedPost: FeedPost): Observable<UpdateResult> {
    return from(this.feedPostRepository.update(id, feedPost));
  }

  deletePost(id: number): Observable<DeleteResult> {
    return from(this.feedPostRepository.delete(id));
  }

  async getAllPostsByUser(userId: number): Promise<FeedPost[]> {
    const userPosts = await this.feedPostRepository.find({
      where: { author: { id: userId } },
    });

    if (!userPosts || userPosts.length === 0) {
      throw new NotFoundException('No posts found for the specified user.');
    }

    return userPosts;
  }
}
