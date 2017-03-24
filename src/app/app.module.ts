import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import 'hammerjs';

//ng-bootstrap components
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap/carousel/carousel.module';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap/pagination/pagination.module';

//services
import { MovieService } from './services/movie-service.service';
import { CastService } from './services/cast-service.service';

//routing
import { RouterModule } from '@angular/router';
import { routing } from './routing.route';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MovieItemComponent } from './movie-item/movie-item.component';
import { HomeComponent } from './home/home.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AboutComponent } from './about/about.component';
import { CastListComponent } from './cast-list/cast-list.component';
import { CastItemComponent } from './cast-item/cast-item.component';
import { CastDetailsComponent } from './cast-details/cast-details.component';
import { MoviesWithGenreComponent } from './movies-with-genre/movies-with-genre.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    FooterComponent,
    NavbarComponent,
    MovieItemComponent,
    HomeComponent,
    MovieDetailsComponent,
    PageNotFoundComponent,
    AboutComponent,
    CastListComponent,
    CastItemComponent,
    CastDetailsComponent,
    MoviesWithGenreComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    FlexLayoutModule.forRoot(),
    RouterModule.forRoot(routing),
    NgbCarouselModule.forRoot(),
    NgbPaginationModule.forRoot()
  ],
  providers: [
    MovieService,
    CastService,
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
