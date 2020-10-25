import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'src/shared/shared.module';
import { MoviesModule } from './movies/movies.module';

@NgModule({
  imports: [SharedModule, MoviesModule],
  exports: [RouterModule],
  declarations: [],
  providers: [],
})
export class FeaturesModule {}
