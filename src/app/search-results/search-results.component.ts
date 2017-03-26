import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MovieService } from '../services/movie-service.service';
import { BASE_API_URL, API_KEY } from '../../config/TMDB';
import { Movie } from '../model/movie';

const MOVIE_SEARCH_URL = `${BASE_API_URL}/search/movie?api_key=${API_KEY}&language=en-US&include_adult=false`;

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  //pagination
  maxSize:number = 5;
  page:number = 1;
  collectionSize:number;
  pageSize: number = 20; //20 items per page
  maxTotalPages: number = 100; //max 100 pages

  movieList: Array<Movie>;
  querySearch: string;
  loading: boolean;

  constructor(
    private router: Router,
    private currentRoute: ActivatedRoute,
    private titleService: Title,
    private movieService: MovieService
  ) { 
    this.movieList = [];
    this.loading = true;
  }

  ngOnInit() {
    this.titleService.setTitle('Search Results');
    this.currentRoute.queryParams
          .switchMap((params: Params) => {
              this.loading = true;
              //cache the query search value
              this.querySearch = params['query'];
              let searchMoviesUrl = MOVIE_SEARCH_URL + `&query=${this.querySearch}&page=${this.page}`;
              
              return this.movieService.getMovies(searchMoviesUrl);
          })
          .subscribe(data => {
            this.movieList = data.movies;
            //toggle loading value
            this.loading = false;
            console.log('loading', this.loading);
            
            this.collectionSize =  ( (data.totalResults / this.pageSize) > this.maxTotalPages ) ? (this.maxTotalPages * this.pageSize) : data.totalResults;
          });
  }

  pageChange(currentPage): void {
    this.loading = true;
    //empty current list 
    this.movieList = [];
    this.page = currentPage;
    let searchMoviesUrl = MOVIE_SEARCH_URL + `&query=${this.querySearch}&page=${this.page}`;

    this.movieService.getMovies(searchMoviesUrl)
              .subscribe(data => {
                this.movieList = data.movies;
                this.loading = false;
              });
  }

}
