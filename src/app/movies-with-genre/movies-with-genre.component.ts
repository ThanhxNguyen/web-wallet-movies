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

const BASE_MOVIE_SEARCH_URL = `${BASE_API_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false`;

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

  genreId: number;
  genreName: string;
  movieList: Array<Movie>;
  movieUrl: string;

  constructor(
    private movieService: MovieService,
    private currentRoute: ActivatedRoute,
    private router: Router,
    private titleService: Title
  ) {
    this.movieList = [];
   }

  ngOnInit() {
    //set title for this page 
    this.titleService.setTitle('Movies');
    this.currentRoute.params
                                .subscribe( (params: Params) => {
                                    this.movieList = [];
                                    //+ symbol converts id param string to number
                                    this.genreId = +params['id'];
                                    this.movieUrl = BASE_MOVIE_SEARCH_URL + `&with_genres=${this.genreId}`;
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
                                });
  }//end ngOnInit

}
