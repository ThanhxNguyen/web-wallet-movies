import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
// import { flyInOut } from '../animations/flyInOut.animation';
import { fadeInOut } from '../animations/fadeInOut.animation';

@Component({
  selector: 'wm-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  animations: [fadeInOut],
  host: { 
    '[@fadeInOut]': 'true',
    '[style.display]': " 'block' ",
  }
})
export class AboutComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit() {
    //set title for this page
    this.titleService.setTitle('About');
  }

}
