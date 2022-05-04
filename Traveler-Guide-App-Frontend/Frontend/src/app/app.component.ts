import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";

@Component({
  selector:'app-root',
  templateUrl : './app.component.html',
  styleUrls:['./app.component.css']
}) 
export class AppComponent implements OnInit{
 title="DemoApp";
 cities:any;
  constructor(private http: HttpClient){}
  ngOnInit() {
    this.getCities();
  }
  getCities() {

    this.http.get('https://localhost:7075/api/Cities').subscribe(response => {
      this.cities =response;
    },error => console.log(error));
  }
}