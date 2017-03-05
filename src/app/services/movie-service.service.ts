import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Movie } from '../model/movie';
import { Cast } from '../model/cast';
import { Genre } from '../model/genre';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

const BASE_API_URL = 'https://api.themoviedb.org/3';
const API_KEY = '1bd3f3a91c22eef0c9d9c15212f43593';

@Injectable()
export class MovieService {

  genreList: Array<Genre>;

  constructor(private http: Http) {
    this.getGenresFromApi().subscribe(genres => this.genreList = genres);
  }

  getGenresFromApi() {
    let genreListUrl = `${BASE_API_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`;
    return this.http.get(genreListUrl)
                            .map(response => {
                                return this.parseGenres(response.json().genres);
                            });
  }

  private parseGenres(rawData: Array<any>): Genre[] {
    let genreList: Array<Genre> = [];
    for(let i=0; i<rawData.length; i++) {
      let temp = rawData[i];
      let genre = new Genre();
      genre.id = temp.id;
      genre.name = temp.name;

      genreList.push(genre);
    }

    return genreList;
  }

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
                                return this.parseCasts(response.json().cast);
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

        if(this.genreList && this.genreList.length > 0) {
          let genresArr: Array<string> = [];
          for(let j=0; j<tempMovie.genre_ids.length; j++) {

            for(let k=0; k<this.genreList.length; k++) {
              if(tempMovie.genre_ids[j] === this.genreList[k].id) {
                //found matching genre object
                genresArr.push(this.genreList[k].name);
                break;
              }//end if
            }//end inner for loop

          }//end outer for loop
          movie.genres = genresArr;
        }//end if

        //add to movie array
        movies.push(movie);

      }//end if
    }//end for loop

    return movies;
  }

  //this method will parse the raw json response from api and return an array of casts
  private parseCasts(rawData: Array<any>): Cast[] {
    //define the limit for how many casts will return to the client, top 10 casts in this case
    //if the total casts is less than 10, then return all (however, this is unlikely to happen)
    let limit: number = ( rawData.length > 10 ) ? 10 : rawData.length;
    let casts: Array<Cast> = [];

    for(let i=0; i<limit; i++) {
      let tempCast = rawData[i];
      let cast = new Cast();

      cast.id = tempCast.id;
      cast.name = tempCast.name;
      cast.character = tempCast.character;
      cast.profilePath = tempCast.profile_path

      //add to cast array 
      casts.push(cast);
    }

    return casts;
  }

}
