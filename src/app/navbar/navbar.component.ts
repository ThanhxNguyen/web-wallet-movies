import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BASE_API_URL, API_KEY } from '../../config/TMDB';
import { MovieService } from '../services/movie-service.service';
import { Movie } from '../model/movie';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
// Observable class extensions
import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'wm-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  searchResults: Observable<Movie[]>;
  private searchTexts = new Subject<string>();
  searchValue: string;

  constructor(
    private movieService: MovieService,
    private router: Router
  ) {
    this.searchValue = '';
   }

  ngOnInit() {
    this.searchResults = this.searchTexts
                                            .debounceTime(300)
                                            .distinctUntilChanged()
                                            .switchMap(value => {
                                                if(value) {
                                                  let searchMoviesUrl = `${BASE_API_URL}/search/movie?api_key=${API_KEY}&query=${value}&language=en-US&page=1&include_adult=false`;
                                                  return this.movieService.getMovies(searchMoviesUrl);
                                                } else {
                                                  return Observable.of<Movie[]>([]);
                                                }
                                            })
                                            .catch(error => {
                                                //errors occur
                                                console.log(error);
                                                return Observable.of<Movie[]>([]);
                                            });
  }

  search(value: string): void {
    this.searchValue = value;
    this.searchTexts.next(value);
  }

  onSearchBarLostFocus(value: string): void {
    //when the search bar loses focus, clear the text and empty search results
    this.searchValue = '';
    this.searchTexts.next('');
  }

  onSearchHintRowClick(movie: Movie): void {
    this.router.navigate(['movie', movie.id]);
  }

}
