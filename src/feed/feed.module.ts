import { Module } from '@nestjs/common';
import { FeedService } from './services/feed.service';
import { FeedPostEntity } from './models/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedController } from './controllers/feed.controller';
import { UserEntity } from 'src/auth/models/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FeedPostEntity, UserEntity])],
  providers: [FeedService],
  controllers: [FeedController],
})
export class FeedModule {}
