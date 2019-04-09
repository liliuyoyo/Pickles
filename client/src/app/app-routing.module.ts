import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoviesListComponent } from './movies-list/movies-list.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { SignupComponent } from './users/signup/signup.component';
import { LoginComponent } from './users/login/login.component';
import { WelcomeComponent } from './users/welcome/welcome.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { MovieEditComponent } from './movie-edit/movie-edit.component';
import { ContactComponent } from './contact/contact.component';
import { MovieAddComponent } from './movie-add/movie-add.component';


const appRoutes:Routes = [
    { path: "", redirectTo:"/movies", pathMatch: "full" },
    { path: "movies", component: MoviesListComponent },
    { path: "movies/new", component: MovieAddComponent },
    { path: "movies/:id", component: MovieDetailComponent },
    { path: "movies/edit/:id", component: MovieEditComponent},
    { path: 'signup', component: SignupComponent},
    { path: 'login', component: LoginComponent},
    { path: 'welcome', component: WelcomeComponent},
    { path: 'userProfile', component: UserProfileComponent},
    { path: 'contact', component: ContactComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule{
}