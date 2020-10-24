import { Injectable, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoviesComponent } from './movies/movies.component';
import { MoviesService } from './movies/movies.service';

@Injectable()
export class MoviesResolver {
  constructor(private moviesService: MoviesService) {}

  public resolve() {
    return this.moviesService.getMovies();
  }
}

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/movies'
  },
  {
    path: 'movies',
    component: MoviesComponent,
    resolve: {
      movies: MoviesResolver,
    },
    children: [
      {
        path: ':id',
        component: MoviesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [MoviesResolver]
})
export class FeaturesRoutingModule {}
