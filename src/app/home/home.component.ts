import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
// import { flyInOut } from '../animations/flyInOut.animation';
import { fadeInOut } from '../animations/fadeInOut.animation';
import { shrinkInOut } from '../animations/shrinkInOut.animation';
import { BASE_API_URL, API_KEY } from '../../config/TMDB';
//services
import { MovieService } from '../services/movie-service.service';
import { Movie } from '../model/movie';
import { Genre } from '../model/genre';

//get date instance
let date = new Date();
let currentDate = date.toISOString().substr(0, 10);
//add more days to it
date.setDate( date.getDate() + 20 );
//convert date object to ISO format string and grab the date from that string YYYY-MM-DD
let newReleaseDate = date.toISOString().substr(0, 10);

//contain info for tabs on home page
const POPULAR = "POPULAR";
const KIDS = "KIDS";

//new release movies for slide
const NEW_RELEASE_URL = `${BASE_API_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&primary_release_date.gte=${currentDate}&primary_release_date.lte=${newReleaseDate}`;

@Component({
  selector: 'wm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [fadeInOut, shrinkInOut],
  host: { 
    '[@fadeInOut]': 'true',
    '[style.display]': " 'block' "
  }
})
export class HomeComponent implements OnInit {

homeTabs = [
  { type: POPULAR, url: `${BASE_API_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false` },
  { type: KIDS, url: `${BASE_API_URL}/discover/movie?api_key=${API_KEY}&language=en-US&certification_country=US&certification.lte=G&sort_by=popularity.desc` },
];

  //store tabs in array
  tabs: Array<any> = [];
  //an array to store random selected genres to display top 20 movies with random genres on home page 
  recommendations: Array<Genre> = [];
  recommendationLimit: number = 4;
  genreList: Array<Genre>;
  //movies for slide 
  newReleaseMovies: Array<Movie> = [];

  //flag to indicate toggle state of recommendation dropdown
  toggleRecommendation: boolean = false;

  constructor(
    private movieService: MovieService,
    private router: Router,
    private titleService: Title
  ) { }

  ngOnInit() {
    //set title for this page 
    this.titleService.setTitle('Home');
    
    //if the genre list has already been cached, use it. Otherwise make a http request to get it from api
    if(!this.movieService.genreList || this.movieService.genreList.length == 0) {
      this.movieService.getGenresFromApi()
                                  .subscribe(genres => {
                                      this.genreList = genres;
                                          if(this.genreList && this.genreList.length > 0) {
                                            this.recommendations = this.generateRandomGenreList(this.genreList);
                                          }
                                  });
    } else {    
      this.genreList = this.movieService.genreList;
      this.recommendations = this.generateRandomGenreList(this.genreList);
    }

    //get new release movies for slide 
    this.movieService.getMovies(NEW_RELEASE_URL)
                                .subscribe(
                                    (data) => {
                                      //get the first 10 movies from response
                                      let movies = data.movies.splice(0, 10);
                                      this.newReleaseMovies = movies.filter(movie => movie.backdropPath != null);
                                    },
                                    () => {
                                      //handling errors
                                    }
                                );

  }//end ngOnInit

  onRecommendationClick(genre: Genre) {
    //navigate to movies page based on genre 
    this.router.navigate(['movies', 'genre', genre.id]);
  }

  //navigate to movie details page when slide image is clicked
  showMovieDetails(movie: Movie): void {
    this.router.navigate(['movie', movie.id]);
  }

  private generateRandomGenreList(genres: Array<Genre>): Array<Genre> {
    let recommendationArr = [];
    let randomNumbersArr: Array<number>;
    randomNumbersArr = this.generateRandomNumbers(0, genres.length);

    for(let i=0; i<randomNumbersArr.length; i++) {
      //store genre objects base on random generated numbers
      recommendationArr.push(this.genreList[ randomNumbersArr[i] ]);
    }

    return recommendationArr;
  }

  private generateRandomNumbers(min: number, max: number): Array<number> {
    let randomNumbersArr: Array<number> = [];

    while(randomNumbersArr.length < 4) {
      let ran = Math.floor( (Math.random() * max) + min );
      //check if the number already existed in the array, if not push new number into array
      if(randomNumbersArr.indexOf(ran) == -1) {
        randomNumbersArr.push(ran);
        continue;
      } else {
        continue;
      }//end if-else
    }//end while loop

    return randomNumbersArr;
  }

}
