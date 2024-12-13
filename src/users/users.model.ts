import { Injectable } from '@nestjs/common';
import { Model } from 'objection';
import TABLES from 'src/database/tables.constant';

@Injectable()
export class UsersModel extends Model {
  static get tableName() {
    return TABLES.USER;
  }
}