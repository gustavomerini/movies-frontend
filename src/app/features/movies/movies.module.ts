import { Injectable, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoviesComponent } from './movies.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MoviesService } from './movies.service';
import { MoviesTableComponent } from './components/movies-table/movies-table.component';
import { FormFieldComponent } from './movie-detail/components/form-field.component';
import { SharedModule } from 'src/shared/shared.module';

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
    redirectTo: '/movies',
  },
  {
    path: 'movies',
    component: MoviesComponent,
    resolve: {
      data: MoviesResolver,
    },
  },
  {
    path: 'movies/:id',
    component: MovieDetailComponent,
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [MoviesComponent, MoviesTableComponent, MovieDetailComponent, FormFieldComponent],
  exports: [RouterModule],
  providers: [MoviesResolver],
})
export class MoviesModule {}
