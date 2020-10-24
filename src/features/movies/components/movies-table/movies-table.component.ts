import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Movie } from 'src/shared/interfaces/movies';

@Component({
  selector: 'app-movies-table',
  templateUrl: 'movies-table.component.html',
  styleUrls: ['movies-table.component.scss']
})
export class MoviesTableComponent implements OnInit {
  @Input() movies: Movie[] = [];

  displayedColumns: string[] = ['name', 'poster'];
  dataSource = new MatTableDataSource(this.movies);

  constructor() {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {}
}
