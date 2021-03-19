import { Test } from '@nestjs/testing';
import { of } from 'rxjs';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { Cat } from './models/cat.model';
import { CreateCatDto } from './models/createCat.dto';

describe('CatsController', () => {
  let catsController: CatsController;
  let catsService: CatsService;
  const cat: Cat = { id: 1, name: 'cat', age: 4, breed: 'breed' };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [CatsService],
    }).compile();
    catsService = moduleRef.get<CatsService>(CatsService);
    catsController = moduleRef.get<CatsController>(CatsController);
  });

  describe('findAll', () => {
    it('returns array of cats', () => {
      const cats: Cat[] = [cat];
      jest.spyOn(catsService, 'findAll').mockImplementation(() => of(cats));
      catsController.findAll().subscribe((val) => expect(val).toBe(cats));
    });
  });

  describe('findOne', () => {
    it('returns one cat', () => {
      jest.spyOn(catsService, 'findOne').mockImplementation(() => of(cat));
      catsController.findOne(1).subscribe((val) => expect(val).toBe(cat));
    });
  });

  describe('create', () => {
    it('creates one cat', () => {
      const createCatDto: CreateCatDto = {
        name: cat.name,
        age: cat.age,
        breed: cat.breed,
      };
      jest.spyOn(catsService, 'create').mockImplementation(() => of(cat));
      catsController
        .create(createCatDto)
        .subscribe((val) => expect(val).toBe(cat));
    });
  });

  describe('update', () => {
    it('update one cat', () => {
      const createCatDto: CreateCatDto = {
        name: cat.name,
        age: cat.age,
        breed: cat.breed,
      };
      jest.spyOn(catsService, 'update').mockImplementation(() => of(cat));
      catsController
        .update(cat.id, createCatDto)
        .subscribe((val) => expect(val).toBe(cat));
    });
  });

  describe('delete', () => {
    it('deletes a cat', () => {
      jest.spyOn(catsService, 'delete').mockImplementation(() => of(cat));
      catsController.delete(cat.id).subscribe((val) => expect(val).toBe(cat));
    });
  });
});
