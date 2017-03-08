import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { flyInOut } from '../animations/flyInOut.animation';
import { fadeInOut } from '../animations/fadeInOut.animation';
import { BASE_API_URL, API_KEY } from '../../config/TMDB';
//services
import { MovieService } from '../services/movie-service.service';
import { Movie } from '../model/movie';
import { Genre } from '../model/genre';

//contain info for tabs on home page
const POPULAR = "POPULAR";
const NEW_RELEASE = "NEW RELEASE";
const HOME_TABS = [
  { type: POPULAR, url: `${BASE_API_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1` },
  { type: NEW_RELEASE, url: `${BASE_API_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=2017-03-04&primary_release_date.lte=2017-03-10` }
]

@Component({
  selector: 'wm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [flyInOut, fadeInOut],
  host: { 
    '[@flyInOut]': 'true',
    '[style.display]': " 'block' "
  }
})
export class HomeComponent implements OnInit {

  //store tabs in array
  tabs: Array<any> = [];
  //an array to store random selected genres to display top 20 movies with random genres on home page 
  recommendations: Array<Genre> = [];
  recommendationLimit: number = 4;
  genreList: Array<Genre>;

  constructor(
    private movieService: MovieService,
    private router: Router,
    private titleService: Title
  ) { }

  ngOnInit() {
    //set title for this page 
    this.titleService.setTitle('Home');
    this.movieService.getGenresFromApi()
                                .subscribe(genres => {
                                    this.genreList = genres;
                                        if(this.genreList && this.genreList.length > 0) {
                                          this.recommendations = this.generateRandomGenreList(this.genreList);
                                        }
                                });


    //loop through HOME_TABS and get movies from api according to each tab and store data into tabs array.
    for(let i=0; i<HOME_TABS.length; i++) {
      let tab = HOME_TABS[i];
      this.movieService.getMovies(tab.url).subscribe(
        //successfully getting movies from api
        (movies) => {
          let tempTab: any = {};
          tempTab.label =  tab.type;
          tempTab.data = movies;

          this.tabs.push(tempTab);
        },
        () => {
          //failed to get movies from api, errors occur
          //do something
        });
    }

  }//end ngOnInit

  onRecommendationClick(genre: Genre) {
    //navigate to movies page based on genre 
    this.router.navigate(['movies', 'genre', genre.id]);
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
