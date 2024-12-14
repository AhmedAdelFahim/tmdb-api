import { Injectable, Logger } from '@nestjs/common';
import R from 'ramda';
import { WishlistsRepository } from './wishlists.repository';
import { WishlistFilter } from './wishlists.type';
import TABLES from 'src/database/tables.constant';
import { RedisService } from 'src/caching/redis.service';

@Injectable()
export class WishlistsService {
  constructor(
    private readonly wishlistsRepository: WishlistsRepository,
    private readonly redisService: RedisService,
  ) {}

  async addToWishlist(movie_id: number, user_id: number) {
    await this.wishlistsRepository.create({ user_id, movie_id });
  }

  async removeFromWishlist(movie_id: number, user_id: number) {
    await this.wishlistsRepository.delete({ user_id, movie_id });
  }

  async filter(filter: WishlistFilter, user_id: number) {
    const cachingKey = this.redisService.getKeyForCaching(filter);
    const movies = await this.redisService.getKey(cachingKey);
    if (!R.isNil(movies)) {
      Logger.verbose(`cache hit for ${JSON.stringify(filter)}`);
      return JSON.parse(movies);
    }
    let query = this.wishlistsRepository
      .query()
      .select(`${TABLES.MOVIE}.*`)
      .join(TABLES.MOVIE, `${TABLES.MOVIE}.id`, `${TABLES.WISHLIST}.movie_id`)
      .where('user_id', user_id)
      .page(filter.page, filter.limit);
    if (!R.isNil(filter.q) && !R.isEmpty(filter.q)) {
      query = query.where((builder) => {
        builder
          .whereILike('title', `%${filter.q}%`)
          .orWhereILike('overview', `%${filter.q}%`);
      });
    }
    const results = await query.page(filter.page - 1, filter.limit);
    await this.redisService.setKey(cachingKey, JSON.stringify(results), {
      ttl: 60 * 60, // 1 hour
    });
    Logger.verbose(`cache miss for ${JSON.stringify(filter)}`);
    return results;
  }
}
