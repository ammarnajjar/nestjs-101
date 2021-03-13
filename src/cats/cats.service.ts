import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { Cat } from './models/cat.model';
import { CreateCatDto } from './models/createCat.dto';

@Injectable()
export class CatsService {
  private cats: Cat[] = [];
  private lastId = 0;

  findAll(): Observable<Cat[]> {
    return of(this.cats);
  }

  findOne(id: number): Observable<Cat> {
    const catFound = this.cats.find((cat) => cat.id === id);
    return catFound ? of(catFound) : of(null);
  }

  create(createCatDto: CreateCatDto): Observable<Cat> {
    const newCat = {
      id: this.lastId,
      name: createCatDto.name,
      age: createCatDto.age,
      breed: createCatDto.breed,
    };
    this.cats = [...this.cats, newCat];
    this.lastId += 1;
    return of(newCat);
  }

  update(id: number, newCat: Cat): Observable<Cat> {
    this.cats = this.cats.map((cat) =>
      cat.id === id
        ? ({
            id,
            name: newCat.name,
            age: newCat.age,
            breed: newCat.breed,
          } as Cat)
        : cat,
    );
    return of(newCat);
  }

  delete(id: number): Observable<Cat> {
    const catFound = this.cats.find((cat) => cat.id === id);
    this.cats = this.cats.filter((cat) => cat.id !== id);
    return of(catFound);
  }
}
