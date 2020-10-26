import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';

import { ConfirmDialogComponent } from 'src/shared/components/dialog/dialog.component';
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
  isNew: boolean = false;
  fields = [
    { id: 'name', label: 'Name' },
    { id: 'year', label: 'Year' },
    { id: 'director', label: 'Director' },
    { id: 'genre', label: 'Genre' },
    { id: 'description', label: 'Description' },
    { id: 'poster', label: 'Poster' },
  ];

  private ngUnsubscribe = new Subject();

  constructor(
    private movieService: MoviesService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {
    this.movie = this.movieService.getCurrentMovie();
  }

  ngOnInit(): void {
    this.formGroup = this.getFormGroup();
    this.route.params.subscribe((params) => {
      if (params['id'] === 'new') {
        this.isNew = true;
        return;
      }
      this.movieService.getMovies().subscribe((response: any) => {
        this.movie = response.db.filter((movie) => movie.id == params['id'])[0];
        this.formGroup.patchValue(this.movie);
      });
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
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

  saveMovie() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    if (this.isNew) {
      this.movieService
        .addMovie({ id: this.movie.id, ...this.formGroup.value })
        .subscribe(() => this.goBack());
    }

    this.movieService
      .updateMovie({ id: this.movie.id, ...this.formGroup.value })
      .subscribe(() => this.goBack());
  }

  confirmDialog(): void {
    const message = `Are you sure you want to do this?`;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: {
        title: 'Delete',
        message,
      },
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.movieService
          .deleteMovie(this.movie.id)
          .subscribe(() => this.goBack());
      }
    });
  }
}
