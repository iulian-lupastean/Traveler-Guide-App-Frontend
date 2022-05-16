import { Component, OnChanges, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search-service';
@Component({
  selector: 'app-travels-search',
  templateUrl: './travels-search.component.html',
  styleUrls: ['./travels-search.component.css'],
})
export class TravelsSearchComponent implements OnInit, OnChanges {
  constructor(private searchService: SearchService) {}
  searchText: string | undefined;
  ngOnInit() {}
  ngOnChanges() {}
  saveSearch() {
    // this.searchText = document.querySelector('input')?.value;
    console.log(this.searchText);
    this.searchService.setSearchString(this.searchText || '');
  }
}
