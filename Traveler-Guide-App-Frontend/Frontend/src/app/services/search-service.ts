import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  searchString!: string;
  searchStringChanges!: Observable<string>;
  private observer!: Observer<string>;
  constructor() {
    this.searchStringChanges = new Observable(
      (observer) => (this.observer = observer)
    );
  }
  setSearchString(data: string) {
    this.searchString = data;
    this.observer.next(data);
  }
  getSearchString() {
    console.log(this.searchString);
    return this.searchString;
  }
}
