import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './partials/header/header.component';
import { FooterComponent } from './partials/footer/footer.component';
import { SliderComponent } from './partials/slider/slider.component';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { FilterComponent } from './partials/filter/filter.component';
import { MovieItemComponent } from './movies-list/movie-item/movie-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SliderComponent,
    MoviesListComponent,
    FilterComponent,
    MovieItemComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
