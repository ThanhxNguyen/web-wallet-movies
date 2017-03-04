import { Routes } from '@angular/router';
//page components
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routing: Routes = [
    //home route
    { path: 'home', component: HomeComponent },
    //about route 
    { path: 'about', component: AboutComponent },
    //movie details route
    { path: 'movie/:id', component: MovieDetailsComponent },
    //default route
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    //called when url is not found
    { path: '**', component: PageNotFoundComponent }
];