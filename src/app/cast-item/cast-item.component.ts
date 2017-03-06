import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Cast } from '../model/cast';

@Component({
  selector: 'wm-cast-item',
  templateUrl: './cast-item.component.html',
  styleUrls: ['./cast-item.component.css']
})
export class CastItemComponent implements OnInit {

  @Input() cast: Cast;
  
  constructor(private router: Router) { }

  ngOnInit() {
  }

  showCastDetails(castId: number): void {
    //navigate to cast details page
    this.router.navigate(['cast', castId]);
  }

}
