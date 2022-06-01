import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchStringChangedSource = new Subject<string>();

  searchStringChanged$ = this.searchStringChangedSource.asObservable();
  constructor() { }
  setSearchString(data: string) {
    this.searchStringChangedSource.next(data);
  }
}
