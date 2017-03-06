import { Component, OnInit, Input } from '@angular/core';

import { Cast } from '../model/cast';

@Component({
  selector: 'wm-cast-item',
  templateUrl: './cast-item.component.html',
  styleUrls: ['./cast-item.component.css']
})
export class CastItemComponent implements OnInit {

  @Input() cast: Cast;
  
  constructor() { }

  ngOnInit() {
  }

}
