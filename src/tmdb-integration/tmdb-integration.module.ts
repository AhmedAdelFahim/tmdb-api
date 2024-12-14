import { Module } from '@nestjs/common';
import { TMDBIntegrationConsumer } from './tmdb-integration.consumer';
import { TMDBIntegrationService } from './tmdb-integration.service';
import { JobsManagerModule } from 'src/jobs-manager/jobs-manager.module';
import { MoviesModule } from 'src/movies/movies.module';
import { GenresModule } from 'src/genres/genres.module';
import { GenreMoviesModule } from 'src/genre-movies/genre-movies.module';

@Module({
  imports: [JobsManagerModule, MoviesModule, GenresModule, GenreMoviesModule],
  providers: [TMDBIntegrationConsumer, TMDBIntegrationService],
})
export class TmdbIntegrationModule {}
