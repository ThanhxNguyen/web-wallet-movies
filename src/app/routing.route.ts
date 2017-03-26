import { Routes } from '@angular/router';
//page components
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { CastDetailsComponent } from './cast-details/cast-details.component';
import { MoviesWithGenreComponent } from './movies-with-genre/movies-with-genre.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routing: Routes = [
    //home route
    { path: 'home', component: HomeComponent },
    //about route 
    { path: 'about', component: AboutComponent },
    //movie details route
    { path: 'movie/:id', component: MovieDetailsComponent },
    //cast details route 
    { path: 'cast/:id', component: CastDetailsComponent },
    //movies base on genre route 
    { path: 'movies/genre/:id', component: MoviesWithGenreComponent },
    //search results 
    { path: 'search', component: SearchResultsComponent },
    //default route
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    //called when url is not found
    { path: '**', component: PageNotFoundComponent }
];