import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './partials/header/header.component';
import { FooterComponent } from './partials/footer/footer.component';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { FilterComponent } from './partials/filter/filter.component';
import { MovieItemComponent } from './movies-list/movie-item/movie-item.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';

// Services
import { MoviesService } from './services/movies.service';

// Routes
import { AppRoutingModule } from './app-routing.module';
import { SignupComponent } from './users/signup/signup.component';
import { LoginComponent } from './users/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MoviesListComponent,
    FilterComponent,
    MovieItemComponent,
    MovieDetailComponent,
    SignupComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [ MoviesService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
