import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoviesListComponent } from './movies-list/movies-list.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';

const appRoutes:Routes = [
    { path: "", redirectTo:"/movies", pathMatch: "full" },
    { path: "movies/:id", component: MovieDetailComponent },
    { path: "movies", component: MoviesListComponent }, //children: [
    //    { path: ":id", component: MovieDetailComponent } 
    //]},
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule{
}