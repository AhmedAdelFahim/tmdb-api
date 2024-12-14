import { Test, TestingModule } from '@nestjs/testing';
import { MovieRatingService } from './movie-rating.service';

describe('MovieRatingService', () => {
  let service: MovieRatingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovieRatingService],
    }).compile();

    service = module.get<MovieRatingService>(MovieRatingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
