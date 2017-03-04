import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Movie } from '../model/movie';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

const BASE_API_URL = 'https://api.themoviedb.org/3';
const API_KEY = '1bd3f3a91c22eef0c9d9c15212f43593';

@Injectable()
export class MovieService {

  constructor(private http: Http) { }

  //get movies from api and return an Observable array of movies
  getMovies(url: string): Observable<Movie[]> {
    return this.http.get(url)
                            .map( response => {
                              //parse raw data 
                              return this.parseMovies(response.json().results)
                            });
  }

  //get single movie from api with an movie id 
  getMovie(movieId: string) {
    let singleMovieUrl: string = `${BASE_API_URL}/movie/${movieId}?api_key=${API_KEY}`;
    return this.http.get(singleMovieUrl)
                            .map(response => {
                              return response.json();
                            });
  }

  getCasts(movieId: string) {
    let movieCastsUrl: string =  `${BASE_API_URL}/movie/${movieId}/credits?api_key=${API_KEY}`;
    return this.http.get(movieCastsUrl)
                            .map(response => {
                              
                            });
  }

  private parseMovies(rawData: Array<any>): Movie[] {
    //initialize an movie array, it will be filled up and return after parse
    let movies: Array<Movie> = [];
    for(let i=0; i<rawData.length; i++) {
      let tempMovie = rawData[i];

      //check if the poster is available yet, if not remove it from results
      if(tempMovie.poster_path != null) {
        //extract values from raw data and store to movie object
        let movie = new Movie();
        movie.id = tempMovie.id;
        movie.title = tempMovie.title;
        movie.overview = tempMovie.overview;
        movie.releaseDate = tempMovie.release_date;
        movie.voteAverage = tempMovie.vote_average;
        movie.posterPath = tempMovie.poster_path;

        //add to movie array
        movies.push(movie);

      }//end if
    }//end for loop

    return movies;
  }

}
