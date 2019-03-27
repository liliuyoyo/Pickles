import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import {CustomFormsModule} from "ng2-validation";

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './partials/header/header.component';
import { FooterComponent } from './partials/footer/footer.component';
import { FilterComponent } from './partials/filter/filter.component';
import { StarRatingComponent } from './partials/star-rating/star-rating.component';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MovieItemComponent } from './movies-list/movie-item/movie-item.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { SignupComponent } from './users/signup/signup.component';
import { LoginComponent } from './users/login/login.component';
import { PolicyComponent } from './policy/policy.component';

// Services
import { MoviesService } from './services/movies.service';
import { UserService } from 'src/app/services/user.service';

// Routes
import { AppRoutingModule } from './app-routing.module';

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
    LoginComponent,
    StarRatingComponent,
    PolicyComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    CustomFormsModule,
  ],
  providers: [ MoviesService,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
