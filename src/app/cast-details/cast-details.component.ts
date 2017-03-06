import { Component, OnInit } from '@angular/core';
//routing
import { ActivatedRoute, Params, Router } from '@angular/router';
//services
import { CastService } from '../services/cast-service.service';
import { IMAGE_BASE_URL } from '../../config/TMDB';
import { Cast } from '../model/cast';
import { Movie } from '../model/movie';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'wm-cast-details',
  templateUrl: './cast-details.component.html',
  styleUrls: ['./cast-details.component.css']
})
export class CastDetailsComponent implements OnInit {

  castId: number;
  cast: Cast;
  castProfilePhotoUrl: string;
  movieCredits: Array<Movie>;

  constructor(
    private currentRoute: ActivatedRoute,
    private  castService: CastService,
    private router: Router
  ) { 
    this.cast = new Cast();
    this.movieCredits = [];
  }

  ngOnInit() {
    //extract cast id from url and make a http request to get more details about this cast 
    this.currentRoute.params
                                .switchMap( (params: Params) => {
                                    //+ symbol converts id param string to number
                                    this.castId = +params['id'];
                                    return this.castService.getCastDetails(this.castId);
                                })
                                .subscribe(castObj => {
                                    this.cast = castObj;
                                    this.castProfilePhotoUrl = `${IMAGE_BASE_URL}/w500${this.cast.profilePath}`;

                                    //make another request to get movies related to this cast 
                                    this.castService.getMovieCredits(this.castId)
                                                              .subscribe(movies => {
                                                                  this.movieCredits = movies;
                                                              });
                                });
  }

  onMovieCreditClick(movie: Movie): void {
    this.router.navigate(['movie', movie.id]);
  }

}
