import { Injectable } from '@nestjs/common';
import path from 'node:path';
import { Model } from 'objection';
import TABLES from '../database/tables.constant';

@Injectable()
export class MoviesModel extends Model {
  static get tableName() {
    return TABLES.MOVIE;
  }

  static get uniqueColumns() {
    return ['tmdb_movie_id'];
  }
}
