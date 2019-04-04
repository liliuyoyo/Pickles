import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CustomFormsModule } from "ng2-validation";
import { ModalModule } from 'ngx-bootstrap';
import { PasswordStrengthBarModule } from 'ng2-password-strength-bar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Services
import { MoviesService } from './services/movies.service';
import { UserService } from 'src/app/services/user.service';

// Routes
import { AppRoutingModule } from './app-routing.module';

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
import { AddCommentComponent } from './movie-detail/add-comment/add-comment.component';
import { WelcomeComponent } from './users/welcome/welcome.component';
<<<<<<< HEAD
import { LoginPopupComponent } from './users/login-popup/login-popup.component';
||||||| merged common ancestors
=======
import { UserProfileComponent } from './users/user-profile/user-profile.component';
>>>>>>> 4995dd6d4829bed0cfd743ee9fa01c39abdb373e


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
    AddCommentComponent,
    WelcomeComponent,
<<<<<<< HEAD
    LoginPopupComponent,
||||||| merged common ancestors
=======
    UserProfileComponent,
>>>>>>> 4995dd6d4829bed0cfd743ee9fa01c39abdb373e
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    CustomFormsModule,
    PasswordStrengthBarModule,
    ModalModule.forRoot(),
    NgbModule.forRoot(),
  ],
  providers: [ MoviesService,UserService],
  bootstrap: [AppComponent],
  entryComponents:[AddCommentComponent,
                   LoginPopupComponent ]
})
export class AppModule { }
