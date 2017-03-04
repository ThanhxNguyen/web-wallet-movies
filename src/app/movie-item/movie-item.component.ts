import { Component, OnInit, Input } from '@angular/core';

import { Movie } from '../model/movie';

@Component({
  selector: 'wm-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css']
})
export class MovieItemComponent implements OnInit {

  @Input() movie: Movie;

  descriptionLimit: number = 100;
  
  constructor() { }

  ngOnInit() {
  }

}
