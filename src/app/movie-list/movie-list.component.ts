import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../model/movie';
import { MovieService } from '../services/movie-service.service';

@Component({
  selector: 'wm-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  //this is the movie url to get movies from api
  @Input() movieUrl: string;

  //pagination
  maxSize: number = 3;
  page: number = 1;
  maxTotalPages: number = 100;
  //items per page
  pageSize: number = 20;
  collectionSize: number;
  paginationSize: string;

  movieList: Array<Movie>;
  loading: boolean;

  constructor(
    private movieService: MovieService
  ) { 
    this.movieList = [];
    this.loading = true;
  }

  ngOnInit() {
  }

  //this life cycle method invokes before ngOnInit the first time, and it will be invoked everytime the binding property changes
  ngOnChanges(changes) {
    this.movieUrl = changes.movieUrl.currentValue;
    let url = this.movieUrl + `&page=${this.page}`;
    this.getMovies(url);
    
  }

  //invoked when pagination changes
  pageChange(currentPage): void {
    this.page = currentPage;
    let url = this.movieUrl + `&page=${this.page}`;
    this.getMovies(url);
  }

  private getMovies(url: string) {
    this.loading = true;
    //empty old movie list in this tab 
    this.movieList = [];
    this.movieService.getMovies(url)
                .subscribe(data => {
                  this.movieList = data.movies;
                  this.collectionSize = ( (data.totalResults / this.pageSize) > this.maxTotalPages ) ? (this.maxTotalPages * this.pageSize) : data.totalResults;
                  this.loading = false;
                });
  }

}
