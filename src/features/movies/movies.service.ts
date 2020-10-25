import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from 'src/shared/interfaces/movies';

@Injectable({ providedIn: 'root' })
export class MoviesService {
  currentMovie: Movie = null;
  constructor(private http: HttpClient) {}

  getMovies() {
    return this.http.get(`../../assets/db/filmes.json`);
  }

  setCurrentMovie(movie: Movie) {
    this.currentMovie = movie;
  }

  getCurrentMovie() {
    return this.currentMovie;
  }
}
