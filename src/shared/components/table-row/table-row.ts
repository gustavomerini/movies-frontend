import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-row',
  template: `
    <ng-container matColumnDef="field" sticky>
      <mat-header-cell *matHeaderCellDef> {{ description }} </mat-header-cell>
      <mat-cell *matCellDef="let row"> {{ row[field] }} </mat-cell>
    </ng-container>
  `,
})
export class TableRowComponent implements OnInit {
  @Input() field: string;
  @Input() description: string;
  constructor() {}

  ngOnInit() {}
}
