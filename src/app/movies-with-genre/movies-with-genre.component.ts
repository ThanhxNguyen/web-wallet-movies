import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
// import { flyInOut } from '../animations/flyInOut.animation';
import { fadeInOut } from '../animations/fadeInOut.animation';
//service
import { MovieService } from '../services/movie-service.service';
import { BASE_API_URL, API_KEY } from '../../config/TMDB';
import { Movie } from '../model/movie';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'wm-movies-with-genre',
  templateUrl: './movies-with-genre.component.html',
  styleUrls: ['./movies-with-genre.component.css'],
  animations: [fadeInOut],
  host: { 
    '[@fadeInOut]': 'true',
    '[style.display]': " 'block' ",
  }
})
export class MoviesWithGenreComponent implements OnInit {

  //pagination
  maxSize:number = 5;
  page:number = 1;
  collectionSize:number;

  genreId: number;
  genreName: string;
  movieList: Array<Movie>;
  baseMoviesWithGenreUrl: string;
  movieData: any;

  constructor(
    private movieService: MovieService,
    private currentRoute: ActivatedRoute,
    private router: Router,
    private titleService: Title
  ) {
    this.movieList = [];
   }

  ngOnInit() {
    this.baseMoviesWithGenreUrl = `${BASE_API_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false`;
    //set title for this page 
    this.titleService.setTitle('Movies');
    this.currentRoute.params
                                .switchMap( (params: Params) => {
                                    //+ symbol converts id param string to number
                                    this.genreId = +params['id'];
                                    //get genre name base on this genre id 
                                    if(this.movieService.genreList != null && this.movieService.genreList.length > 0) {
                                      //there is genre list in cache, use it
                                      for(let g of this.movieService.genreList) {
                                        if(g.id === this.genreId) {
                                          this.genreName = g.name;
                                          break;
                                        }
                                      }
                                    } else {
                                      //no genre list in cache yet, make a http request to get
                                      this.movieService.getGenresFromApi()
                                                                  .subscribe(genres => {
                                                                      for(let g of this.movieService.genreList) {
                                                                          if(g.id === this.genreId) {
                                                                            this.genreName = g.name;
                                                                            break;
                                                                          }
                                                                      }
                                                                  });
                                    }//end if-else
                                    let movieUrl = this.baseMoviesWithGenreUrl + `&with_genres=${this.genreId}&page=${this.page}`;
                                    return this.movieService.getMovies(movieUrl);
                                })
                                .subscribe(data => {
                                    this.movieData = data;
                                    this.movieList = this.movieData.movies;
                                    this.collectionSize = this.movieData.totalPages;
                                });
  }//end ngOnInit

  pageChange(currentPage): void {
    //empty current list 
    this.movieList = [];
    this.page = currentPage;
    let movieUrl = this.baseMoviesWithGenreUrl + `&with_genres=${this.genreId}&page=${this.page}`;

    this.movieService.getMovies(movieUrl)
              .subscribe(data => {
                this.movieData = data;
                this.movieList = this.movieData.movies;
              });
  }

}
