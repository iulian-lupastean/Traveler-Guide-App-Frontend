import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(private router: Router,) { }
  ngOnInit(): void {

  }


  checkForUserId() {
    if (localStorage.getItem("userId") == null) {
      return false;
    } else {
      return true;
    }

  }
  logout() {
    localStorage.removeItem("userId")
    this.router.navigate(['../']);
  }
}
