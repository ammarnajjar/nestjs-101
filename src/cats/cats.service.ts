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

  findOne(_id: string): Observable<Cat> {
    const id = Number.parseInt(_id, 10);
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

  update(_id: string, newCat: Cat): Observable<Cat> {
    const id = Number.parseInt(_id, 10);
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

  delete(_id: string): Observable<Cat> {
    const id = Number.parseInt(_id, 10);
    const catFound = this.cats.find((cat) => cat.id === id);
    this.cats = this.cats.filter((cat) => cat.id !== id);
    return of(catFound);
  }
}
