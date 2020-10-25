import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { Movie } from 'src/shared/interfaces/movies';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent implements OnInit {
  movie: Movie = null;
  formGroup: FormGroup;

  private ngUnsubscribe = new Subject();

  constructor(
    private movieService: MoviesService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.movie = this.movieService.getCurrentMovie();
    console.log(this.movie);
  }

  ngOnInit(): void {
    this.formGroup = this.getFormGroup();
    this.route.params.subscribe((params) => {
      if (params['id'] !== 'new') {
        this.movieService.getMovies().subscribe((response: any) => {
          this.movie = response.db.filter(
            (movie) => movie.id == params['id']
          )[0];
          this.formGroup.patchValue(this.movie);
        });
      }
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onSubmit() {
    if (!this.formGroup.valid) {
      this.formGroup.markAllAsTouched();
      return;
    }
    console.log(this.formGroup.value);
    this.movieService.setCurrentMovie(this.formGroup.value);
  }

  goBack() {
    this.router.navigate(['../']);
  }

  private getFormGroup() {
    const formGroup = this.formBuilder.group({
      name: [{ value: '' }, Validators.compose([Validators.required])],
      year: [{ value: '' }, Validators.compose([Validators.required])],
      director: [{ value: '' }, Validators.compose([Validators.required])],
      genre: [{ value: '' }, Validators.compose([Validators.required])],
      description: [{ value: '' }, Validators.compose([Validators.required])],
      poster: [{ value: '' }, Validators.compose([Validators.required])],
    });

    return formGroup;
  }
}
