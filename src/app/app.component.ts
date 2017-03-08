import { Component, OnInit, Inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'wm-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    //register to listen when the route changes and scroll the new to the top 
    this.router.events.subscribe( (e) => {
      if( !(e instanceof NavigationEnd)) return;
      //scroll the page to top
      window.scrollTo(0, 0);
    });
  }
}
