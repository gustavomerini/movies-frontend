import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Movie } from 'src/shared/interfaces/movies';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  public movies: Movie[];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: any) => this.onRouteDataChange(data));
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public onRouteDataChange(response: any) {
    this.movies = response.data.movies;
  }
}
