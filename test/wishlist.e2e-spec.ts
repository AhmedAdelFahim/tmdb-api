import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { AllExceptionFilter } from '../src/filters/all-exception-filter';
import { Knex } from 'knex';
import TABLES from '../src/database/tables.constant';
import { MoviesTypes } from '../src/tmdb-integration/tmdb-integration.type';
import { UsersService } from '../src/users/users.service';

describe('WishlistController (e2e)', () => {
  let app: INestApplication;
  let knexInstance: Knex;
  const movie = {
    title: 'x-men',
    original_title: 'x-men',
    overview: 'x-men overview',
    tmdb_movie_id: '3',
    movie_type: MoviesTypes.NOW_PLAYING,
    release_date: '2024-01-01',
  };

  const genre = {
    name: 'Action',
    tmdb_genre_id: '1',
    genre_type: 'MOVIE',
  };

  const genreMovie = {
    tmdb_genre_id: genre.tmdb_genre_id,
    tmdb_movie_id: movie.tmdb_movie_id,
  };

  const user = {
    name: 'ahmed',
    email: 'ahmed.adel@email.com',
    hashedPassword:
      '$2b$10$G1iw3TBisHfrUCbUvyM1lO1nER43UUOHMiBnMEVCK3mm1qFiCnpcW',
    password: 'P@ssw0rd',
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let insertedMovie;
  let insertedUser;
  let accessToken;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    knexInstance = app.get('KNEX_CONNECTION');
    const usersService = app.get(UsersService);
    await knexInstance.table(TABLES.WISHLIST).del();
    await knexInstance.table(TABLES.GENRE).del();
    await knexInstance.table(TABLES.GENRE_MOVIE).del();
    await knexInstance.table(TABLES.MOVIE).del();
    await knexInstance.table(TABLES.GENRE).insert(genre).returning('*');
    insertedMovie = (
      await knexInstance.table(TABLES.MOVIE).insert(movie).returning('*')
    )[0];
    await knexInstance
      .table(TABLES.GENRE_MOVIE)
      .insert(genreMovie)
      .returning('*');

    await knexInstance.table(TABLES.USER).del();
    insertedUser = (
      await knexInstance
        .table(TABLES.USER)
        .insert({
          name: user.name,
          email: user.email,
          password: user.hashedPassword,
        })
        .returning('*')
    )[0];

    accessToken = (
      await usersService.signIn({ email: user.email, password: user.password })
    ).accessToken;
    await app.init();
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalFilters(new AllExceptionFilter());
    await app.init();
  });

  it('/wishlists/{movie_id} (POST) ', () => {
    return request(app.getHttpServer())
      .post(`/wishlists/${insertedMovie.id}`)
      .set({ authorization: `Bearer ${accessToken}` })
      .expect(201)
      .expect({ data: { message: 'Added successfully', code: 201 } });
  });

  afterAll(async () => {
    await knexInstance.table(TABLES.GENRE).del();
    await knexInstance.table(TABLES.WISHLIST).del();
    await knexInstance.table(TABLES.GENRE_MOVIE).del();
    await knexInstance.table(TABLES.MOVIE).del();
    await knexInstance.table(TABLES.USER).del();
    await knexInstance.destroy();
    await app.close();
  });
});
