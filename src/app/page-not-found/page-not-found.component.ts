import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { flyInOut } from '../animations/flyInOut.animation';
// import { fadeInOut } from '../animations/fadeInOut.animation';

@Component({
  selector: 'wm-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css'],
  animations: [flyInOut],
  host: { 
    '[@flyInOut]': 'true',
    '[style.display]': " 'block' ",
  }
})
export class PageNotFoundComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit() {
    //set title for this page 
    this.titleService.setTitle('404 Page Not Found');
  }

}
