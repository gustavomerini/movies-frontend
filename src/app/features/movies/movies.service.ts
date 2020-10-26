import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Movie } from 'src/shared/interfaces/movies';
import { uuidv4 } from 'src/shared/utils/utils';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class MoviesService {
  currentMovie: Movie = null;
  constructor(private http: HttpClient) {}

  getMovies() {
    return this.http.get(`${environment.API_SERVER}/db`);
  }

  addMovie(movie: Movie) {
    const newMovie = { id: uuidv4(), ...movie };
    return this.http.post(`${environment.API_SERVER}/movies`, newMovie);
  }

  updateMovie(movie: Movie) {
    return this.http.patch(
      `${environment.API_SERVER}/movies/${movie.id}`,
      movie
    );
  }

  deleteMovie(id: string) {
    return this.http.delete(`${environment.API_SERVER}/movies/${id}`);
  }

  setCurrentMovie(movie: Movie) {
    this.currentMovie = movie;
  }

  getCurrentMovie() {
    return this.currentMovie;
  }
}
