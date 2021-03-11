import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Observable } from 'rxjs';
import { Cat } from './models/cat.model';
import { CreateCatDto } from './models/createCat.dto';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  findAll(): Observable<Cat[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<Cat> {
    return this.catsService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  create(@Body() createCatDto: CreateCatDto): Observable<Cat> {
    return this.catsService.create(createCatDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() cat: Cat): Observable<Cat> {
    return this.catsService.update(id, cat);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<Cat> {
    return this.catsService.delete(id);
  }
}
