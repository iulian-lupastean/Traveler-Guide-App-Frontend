import { Injectable } from '@angular/core';

@Injectable()
export class SearchService {
  searchString!: string;
  constructor() {}
  setSearchString(data: string) {
    this.searchString = data;
  }
  getSearchString() {
    console.log(this.searchString);
    return this.searchString;
  }
}
