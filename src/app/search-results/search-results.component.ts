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

  movieList: Array<Movie>;
  querySearch: string;
  loading: boolean;
  movieUrl: string;

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
          .subscribe((params: Params) => {
              this.loading = true;
              //cache the query search value
              this.querySearch = params['query'];
              this.movieUrl = MOVIE_SEARCH_URL + `&query=${this.querySearch}`;
          });
  }//end ngOnInit

}
