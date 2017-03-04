import { Component, OnInit } from '@angular/core';

//services
import { MovieService } from '../services/movie-service.service';

import { Movie } from '../model/movie';

//contain info for tabs on home page
const POPULAR = "POPULAR";
const NEW_RELEASE = "NEW RELEASE";
const HOME_TABS = [
  { type: POPULAR, url: "https://api.themoviedb.org/3/discover/movie?api_key=1bd3f3a91c22eef0c9d9c15212f43593&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1" },
  { type: NEW_RELEASE, url: "https://api.themoviedb.org/3/discover/movie?api_key=1bd3f3a91c22eef0c9d9c15212f43593&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=2017-03-04&primary_release_date.lte=2017-03-10" }
]

@Component({
  selector: 'wm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //store tabs in array
  tabs: Array<any> = [];

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    //loop through HOME_TABS and get movies from api according to each tab and store data into tabs array.
    for(let tab of HOME_TABS) {
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
  }

}
