import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Cast } from '../model/cast';
import { Movie } from '../model/movie';
import { BASE_API_URL, API_KEY } from '../../config/TMDB';

@Injectable()
export class CastService {

  constructor(private http: Http) { }

  getCastDetails(castId: number): Observable<Cast> {
    let castDetailsUrl = `${BASE_API_URL}/person/${castId}?api_key=${API_KEY}&language=en-US`;
    return this.http.get(castDetailsUrl)
                            .map(response => {
                                return this.parseCast(response.json());
                            });
  }

  getMovieCredits(castId: number): Observable<Movie[]> {
    let movieCreditsUrl = `${BASE_API_URL}/person/${castId}/movie_credits?api_key=${API_KEY}&language=en-US`;
    return this.http.get(movieCreditsUrl)
                            .map(response => {
                              return this.parseMovieCredits(response.json().cast);
                            });
  }

  private parseCast(rawData: any): Cast {
    let cast = new Cast();
    cast.id = rawData.id;
    cast.name = rawData.name;
    cast.profilePath = rawData.profile_path;
    cast.birthday = (rawData.birthday != null) ? rawData.birthday : 'unknown';
    cast.placeOfBirth = (rawData.place_of_birth != null) ? rawData.place_of_birth : 'unknown';
    cast.biography = (rawData.biography != null) ? rawData.biography : 'No biography available yet!';

    return cast;
  }

  private parseMovieCredits(rawData: any): Array<Movie> {
    let movieList: Array<Movie> = [];

    for(let i=0; i<rawData.length; i++) {
      let tempMovie = rawData[i];
      if(tempMovie.poster_path != null) {
        let movie = new Movie();
        movie.id = tempMovie.id;
        movie.title = tempMovie.title;
        movie.releaseDate = tempMovie.release_date;
        movie.posterPath = tempMovie.poster_path;

        movieList.push(movie);
      }
    }
    return movieList;
  }

}
