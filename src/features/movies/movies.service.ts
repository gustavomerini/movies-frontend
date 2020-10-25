import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from 'src/shared/interfaces/movies';
import { uuidv4 } from 'src/shared/utils/utils';

@Injectable({ providedIn: 'root' })
export class MoviesService {
  currentMovie: Movie = null;
  constructor(private http: HttpClient) {}

  getMovies() {
    return this.http.get(`http://localhost:3000/db`);
  }

  addMovie(movie: Movie) {
    const newMovie = { id: uuidv4(), ...movie };
    return this.http.post(`http://localhost:3000/db`, newMovie);
  }

  updateMovie(movie: Movie) {
    return this.http.patch(`http://localhost:3000/db/${movie.id}`, movie);
  }

  deleteMovie(id: string) {
    return this.http.delete(`http://localhost:3000/db/${id}`);
  }

  setCurrentMovie(movie: Movie) {
    this.currentMovie = movie;
  }

  getCurrentMovie() {
    return this.currentMovie;
  }
}
