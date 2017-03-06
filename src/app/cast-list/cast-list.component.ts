import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Cast } from '../model/cast';

@Component({
  selector: 'wm-cast-list',
  templateUrl: './cast-list.component.html',
  styleUrls: ['./cast-list.component.css']
})
export class CastListComponent implements OnInit {

  @Input() castList: Array<Cast>;
  @Output() onViewAllCasts = new EventEmitter();

  //flag to indicate the disability of view all cast button
  ableViewAll: boolean;
  viewMoreCastsBtnText: string;

  constructor() { 
    //set to true by default
    this.ableViewAll = true;
    this.viewMoreCastsBtnText = 'VIEW MORE';
  }

  ngOnInit() {
  }

  viewAllCasts() {
    if(this.ableViewAll) {
      this.ableViewAll = false;
      this.viewMoreCastsBtnText = 'VIEW LESS';
      //tell parent component that it needs more casts
      this.onViewAllCasts.emit(true);
    } else {
      this.ableViewAll = true;
      this.viewMoreCastsBtnText = 'VIEW MORE';
      //tell parent component that it needs less casts
      this.onViewAllCasts.emit(false);
    }
  }

}
