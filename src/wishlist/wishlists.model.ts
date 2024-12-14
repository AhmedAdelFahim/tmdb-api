import { Injectable } from '@nestjs/common';
import { Model } from 'objection';
import TABLES from 'src/database/tables.constant';

@Injectable()
export class WishlistsModel extends Model {
  static get tableName() {
    return TABLES.WISHLIST;
  }
}
