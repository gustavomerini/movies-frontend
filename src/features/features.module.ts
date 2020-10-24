import { NgModule } from '@angular/core';

import { SharedModule } from 'src/shared/shared.module';
import { FeaturesRoutingModule } from './features-routing.module';
import { MoviesTableComponent } from './movies/components/movies-table/movies-table.component';
import { MoviesComponent } from './movies/movies.component';
import { MoviesService } from './movies/movies.service';

@NgModule({
    imports: [SharedModule, FeaturesRoutingModule],
    exports: [],
    declarations: [MoviesComponent, MoviesTableComponent],
    providers: [MoviesService],
})
export class FeaturesModule { }
