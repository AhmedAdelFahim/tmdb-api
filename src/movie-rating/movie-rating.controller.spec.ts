import { Test, TestingModule } from '@nestjs/testing';
import { MovieRatingController } from './movie-rating.controller';

describe('MovieRatingController', () => {
  let controller: MovieRatingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieRatingController],
    }).compile();

    controller = module.get<MovieRatingController>(MovieRatingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
