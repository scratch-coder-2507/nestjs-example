import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { FeedService } from '../services/feed.service';
import { FeedPost } from '../models/post.interface';
import { Observable } from 'rxjs';
import { UpdateResult, DeleteResult } from 'typeorm';

@Controller('feed')
export class FeedController {
  constructor(private feedService: FeedService) {}

  @Post()
  async createPost(@Body() createPostDto: FeedPost) {
    const post = await this.feedService.createPost(createPostDto);
    return post;
  }

  //   @Get()
  //   findAll(): Observable<FeedPost[]> {
  //     return this.feedService.findAllPosts();
  //   }

  @Get()
  findSelected(
    @Query('take') take = 1,
    @Query('skip') skip = 1,
  ): Observable<FeedPost[]> {
    take = take > 20 ? 20 : take;
    return this.feedService.findPosts(take, skip);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() feedPost: FeedPost,
  ): Observable<UpdateResult> {
    return this.feedService.updatePost(id, feedPost);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Observable<DeleteResult> {
    return this.feedService.deletePost(id);
  }

  @Get(':userId')
  async getPostsByUser(@Param('userId') userId: number) {
    const posts = await this.feedService.getAllPostsByUser(userId);
    return posts;
  }
}
