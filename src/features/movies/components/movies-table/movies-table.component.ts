import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Movie } from 'src/shared/interfaces/movies';

@Component({
  selector: 'app-movies-table',
  templateUrl: 'movies-table.component.html',
  styleUrls: ['movies-table.component.scss'],
})
export class MoviesTableComponent implements OnInit, AfterViewInit {
  @Input() movies: Movie[] = [];
  dataSource = null;
  displayedColumns: string[] = ['name', 'year', 'director', 'genre', 'action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Movie>(this.movies);
  }
}
