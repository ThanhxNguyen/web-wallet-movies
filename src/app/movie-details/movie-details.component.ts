import { Component, OnInit } from '@angular/core';
//routing
import { ActivatedRoute, Params } from '@angular/router';
//services
import { MovieService } from '../services/movie-service.service';

import { Cast } from '../model/cast';
import { Movie } from '../model/movie';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'wm-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  movie: Movie;
  castList: Array<Cast>;
  recommendedMovieList: Array<Movie>;
  movieId: string;
  moviePosterUrl;

  constructor(
    private currentRoute: ActivatedRoute,
    private movieService: MovieService,
  ) { 
    this.movie = new Movie();
  }

  ngOnInit() {
    //params return Observable
    this.currentRoute.params
                              //get params from route and create new Observable
                              .switchMap( (params: Params) => {
                                  this.movieId = params['id'];
                                  return this.movieService.getMovie(this.movieId);
                              })
                              .subscribe( fullMovieDetailsObj => {
                                  // console.log(fullMovieDetailsObj);
                                  this.movie = this.parseMovie(fullMovieDetailsObj);
                                  this.moviePosterUrl = `http://image.tmdb.org/t/p/w342/${this.movie.posterPath}`;
                                  //make another http request to api to get casts list 
                                  this.movieService.getCasts(this.movieId, 5)
                                                              .subscribe(casts => {
                                                                  // console.log(casts);
                                                                  this.castList = casts;
                                                              });
                                  //make request to get recommendation movies from this movie 
                                  this.movieService.getRecommendedMovies(this.movieId)
                                                              .subscribe(movies => {
                                                                  this.recommendedMovieList = movies;
                                                              });
                              });
  }//end ngOnInit

  //handle event from CastListComponent
  getAllCasts(getMore: boolean) {
    if(getMore) {
      //get all casts related to the movie
      this.movieService.getCasts(this.movieId, 0)
                                  .subscribe(casts => {
                                      // console.log(casts);
                                      this.castList = casts;
                                  });
    } else {
      //keep the first 5 and remove the rest
      this.castList = this.castList.splice(0, 5);
    }
  
  }

  private parseMovie(rawMovie: any): Movie {
    let movie = new Movie();
    movie.id = rawMovie.id;
    movie.title = rawMovie.title;
    movie.overview = rawMovie.overview;
    movie.releaseDate = rawMovie.release_date;
    movie.status = rawMovie.status;
    movie.voteAverage = rawMovie.vote_average
    movie.posterPath = rawMovie.poster_path;
    movie.budget = (rawMovie.budget === 0) ? 0 : Math.round(rawMovie.budget / 1000000) ;
    movie.revenue = rawMovie.revenue;
    movie.runtime = rawMovie.runtime;
    movie.genres = this.parseGenres(rawMovie.genres);
    movie.productionCompanies = this.parseProductionCompanies(rawMovie.production_companies);
    movie.productionCountries = this.parseProductionCountries(rawMovie.production_countries);

    return movie;
  }//end parseMovie

  private parseGenres(rawGenres: any): Array<string> {
    let genres: Array<string> = [];
    //check if the raw genre values array is empty or not
    if(rawGenres && rawGenres.length > 0) {
      for(let i=0; i<rawGenres.length; i++) {
        genres.push(rawGenres[i].name);
      }//end for loop
    } else {
      genres.push('unknown');
    }

    return genres;
  }//end parseGenres

  private parseProductionCompanies(rawData: any): Array<string> {
    let productionCompanies: Array<string> = [];
    if(rawData && rawData.length > 0) {
      for(let i=0; i<rawData.length; i++) {
        productionCompanies.push(rawData[i].name);
      }//end for loop
    } else {
      productionCompanies.push('unknown');
    }

    return productionCompanies;
  }//end parseProductionCompanies

  private parseProductionCountries(rawData: any): Array<string> {
    let productionCountries: Array<string> = [];
    if(rawData && rawData.length > 0) {
      for(let i=0; i<rawData.length; i++) {
        productionCountries.push(rawData[i].name);
      }//end for loop 
    } else {
      productionCountries.push('unknown');
    }

    return productionCountries;
  }

}
