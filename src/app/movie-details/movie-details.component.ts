import { Component, OnInit } from '@angular/core';
//routing
import { ActivatedRoute, Params } from '@angular/router';
//services
import { MovieService } from '../services/movie-service.service';

import { Cast } from '../model/cast';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'wm-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  movieDetails: Object;
  castList: Array<Cast>;
  movieId: string;

  constructor(
    private currentRoute: ActivatedRoute,
    private movieService: MovieService
  ) { }

  ngOnInit() {
    //params return Observable
    this.currentRoute.params
                              //get params from route and create new Observable
                              .switchMap( (params: Params) => {
                                  this.movieId = params['id'];
                                  return this.movieService.getMovie(this.movieId);
                              })
                              .subscribe( fullMovieDetailsObj => {
                                  console.log(fullMovieDetailsObj);
                                  this.movieDetails = fullMovieDetailsObj;
                                  //make another http request to api to get casts list 
                                  this.movieService.getCasts(this.movieId)
                                                              .subscribe(casts => {
                                                                  // console.log(casts);
                                                                  this.castList = casts;
                                                              });
                              });
  }

}
