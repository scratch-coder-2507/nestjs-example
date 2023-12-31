/* eslint-disable prettier/prettier */

import { User } from 'src/auth/models/user.interface';

export interface FeedPost {
  id?: number;
  body?: string;
  createdAt?: Date;
  userId?: number;
  author?: User;
}
