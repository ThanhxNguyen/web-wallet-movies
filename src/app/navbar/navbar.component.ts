import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Router } from '@angular/router';

//animation
import { fadeInOut } from '../animations/fadeInOut.animation';
// import { shrinkInOut } from '../animations/shrinkInOut.animation';

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
  styleUrls: ['./navbar.component.css'],
  animations: [ fadeInOut ]
})
export class NavbarComponent implements OnInit {

  searchResults: Observable<Movie[]>;
  private searchTexts = new Subject<string>();
  searchValue: string;
  previousScrollPosition: number;
  //flag to indicate show/hide search bar on scroll
  showSearchBar: boolean;
  //flag to indicate how/hide clear search button
  showClearSearchBtn: boolean;

  constructor(
    private movieService: MovieService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.searchValue = '';
    this.previousScrollPosition = 0;
    //show search bar by default
    this.showSearchBar = true;
    this.showClearSearchBtn = false;
   }

   @HostListener('window:scroll', [])
   onWindowScroll() {
     //documentElement is undefined in Chrome/Firefox, if documentElement is undefined, use body.scrollTop
      let scrollPosition: number = this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;

      if(scrollPosition === 0) {
        //reach the top of the page, reset from start
        this.showSearchBar = true;
        this.previousScrollPosition = scrollPosition;
      }else if(scrollPosition > 60 && scrollPosition > this.previousScrollPosition) {
        //if users scrolls down 60px (size of search bar) and the current scroll position > previous scroll position
        //hide the search bar 
        // console.log('scroll down');
        this.showSearchBar = false;
        this.previousScrollPosition = scrollPosition;
      } else if( (this.previousScrollPosition - scrollPosition) > 100) {//show only if users scroll up more than 100px
        // console.log('scroll up');
        //users scroll up, show search bar
        this.showSearchBar = true;
        this.previousScrollPosition = scrollPosition;
      }
   }

  ngOnInit() {
    this.searchResults = this.searchTexts
                                            .debounceTime(300)
                                            .distinctUntilChanged()
                                            .switchMap(value => {
                                                if(value.trim()) {
                                                  let searchMoviesUrl = `${BASE_API_URL}/search/movie?api_key=${API_KEY}&query=${value}&language=en-US&page=1&include_adult=false`;
                                                  return this.movieService.getMovies(searchMoviesUrl)
                                                                  .map(data => data.movies);
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

  //invoke when users press enter when searching for movies 
  onEnterPressed(value: string): void {
    if(value.trim().length > 0) {
      this.searchTexts.next('');
      this.router.navigate(['search'], { queryParams: {query: value.trim()} });
    }
  }

  search(value: string): void {
    this.searchValue = value;
    this.searchTexts.next(value);
  }

  onSearchBarLostFocus(value: string): void {
    //when the search bar loses focus, clear the text and empty search results
    this.searchValue = '';
    this.searchTexts.next('');
    this.showClearSearchBtn = false;
  }

  onSearchBarGainFocus() {
    //show clear search button when users click on the search bar and start typing
    this.showClearSearchBtn = true;
  }

  onSearchHintRowClick(movie: Movie): void {
    this.router.navigate(['movie', movie.id]);
  }

  clearSearch() {
    //clear search text from search bar 
    this.searchValue = '';
  }

}
