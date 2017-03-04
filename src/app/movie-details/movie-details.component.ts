import { Component, OnInit } from '@angular/core';
//routing
import { ActivatedRoute, Params } from '@angular/router';
//services
import { MovieService } from '../services/movie-service.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'wm-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  movieDetails: Object;

  constructor(
    private currentRoute: ActivatedRoute,
    private movieService: MovieService
  ) { }

  ngOnInit() {
    //return Observable
    this.currentRoute.params
                              //get params from route and create new Observable
                              .switchMap( (params: Params) => this.movieService.getMovie(params['id']) )
                              .subscribe( fullMovieDetailsObj => this.movieDetails = fullMovieDetailsObj );
  }

}
