import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoviesListComponent } from './movies-list/movies-list.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { SignupComponent } from './users/signup/signup.component';
import { LoginComponent } from './users/login/login.component';
import { PolicyComponent } from './policy/policy.component';

const appRoutes:Routes = [
    { path: "", redirectTo:"/movies", pathMatch: "full" },
    { path: "movies", component: MoviesListComponent }, 
    { path: "movies/:id", component: MovieDetailComponent },
    { path: 'signup', component: SignupComponent},
    { path: 'login', component: LoginComponent},
    { path: 'policy', component: PolicyComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule{
}