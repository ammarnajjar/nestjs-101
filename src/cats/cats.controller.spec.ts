import { of } from 'rxjs';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { Cat } from './models/cat.model';

describe('CatsController', () => {
  let catsController: CatsController;
  let catsService: CatsService;
  const cat: Cat = { id: 1, name: 'cat', age: 4, breed: 'breed' };

  beforeEach(() => {
    catsService = new CatsService();
    catsController = new CatsController(catsService);
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
});
