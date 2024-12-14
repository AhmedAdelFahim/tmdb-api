import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { MoviesService } from './movies.service';
import schema from './movies-validation.schema';
import { JoiValidationPipe } from 'src/pipes/joi-validation.pipe';
import { MovieFilter } from './movies.type';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}
  @ApiOperation({ summary: 'List movies' })
  @ApiBody({
    type: MovieFilter,
    description: 'filter options',
  })
  @Post('list')
  async list(@Body(new JoiValidationPipe(schema.list)) body: any) {
    const res = await this.moviesService.filter(body);
    return {
      data: {
        movies: res.results,
        page: {
          total_items: res.total,
          total_pages: Math.ceil(res.total / body.limit),
        },
      },
    };
  }
}
