import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoviesListComponent } from './movies-list/movies-list.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';

const appRoutes:Routes = [
    { path: "", redirectTo:"/movies", pathMatch: "full" },
    { path: "movies", component: MoviesListComponent }, 
    { path: "movies/:id", component: MovieDetailComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule{
}