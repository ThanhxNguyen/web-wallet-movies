import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../services/movie-service.service';
import { Movie } from '../model/movie';
import { Genre } from '../model/genre';

@Component({
  selector: 'wm-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css']
})
export class MovieItemComponent implements OnInit {

  @Input() movie: Movie;

  descriptionLimit: number = 200;
  
  constructor(
    private movieService: MovieService,
    private router: Router
    ) { }

  ngOnInit() {

  }

  showMovieDetails(movie: Movie): void {
    this.router.navigate(['movie', movie.id]);
  }

  onGenreClick(genre: Genre): void {
    if(genre.id !== 0) this.router.navigate(['movies', 'genre', genre.id]);
  }

}
