import { Component, OnInit } from '@angular/core';

//services
import { MovieService } from '../services/movie-service.service';

import { Movie } from '../model/movie';
import { Genre } from '../model/genre';

//contain info for tabs on home page
const POPULAR = "POPULAR";
const NEW_RELEASE = "NEW RELEASE";
const HOME_TABS = [
  { type: NEW_RELEASE, url: "https://api.themoviedb.org/3/discover/movie?api_key=1bd3f3a91c22eef0c9d9c15212f43593&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=2017-03-04&primary_release_date.lte=2017-03-10" },
  { type: POPULAR, url: "https://api.themoviedb.org/3/discover/movie?api_key=1bd3f3a91c22eef0c9d9c15212f43593&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1" }
]

@Component({
  selector: 'wm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //store tabs in array
  tabs: Array<any> = [];
  //an array to store random selected genres to display top 20 movies with random genres on home page 
  recommendations: Array<Genre> = [];
  recommendationLimit: number = 4;
  genreList: Array<Genre>;

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.movieService.getGenresFromApi()
                                .subscribe(genres => {
                                    this.genreList = genres;
                                        if(this.genreList && this.genreList.length > 0) {
                                          this.recommendations = this.generateRandomGenreList(this.genreList);
                                        } else {
                                          console.log('genre list emtpty');
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
    console.log('rec clicked');
    console.log(genre);
  }

  private generateRandomGenreList(genres: Array<Genre>): Array<Genre> {
    let recommendationArr = [];
    let randomNumbersArr: Array<number>;
    randomNumbersArr = this.generateRandomNumbers(0, genres.length);

    for(let i=0; i<randomNumbersArr.length; i++) {
      recommendationArr.push(this.genreList[ randomNumbersArr[i] ]);
    }

    return recommendationArr;
  }

  private generateRandomNumbers(min: number, max: number): Array<number> {
    let randomNumbersArr: Array<number> = [];

    while(randomNumbersArr.length < 4) {
      let ran = Math.floor( (Math.random() * max) + min );
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
