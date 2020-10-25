import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  template: `
    <mat-toolbar color="primary">
      <mat-toolbar-row>
        <span>Movie App</span>
        <span class="example-spacer"></span>
      </mat-toolbar-row>
    </mat-toolbar>
  `,
})
export class NavbarComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
