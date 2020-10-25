import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject, Input } from '@angular/core';

@Component({
  selector: 'app-dialog',
  template: `
    <h1 mat-dialog-title>
      {{ title }}
    </h1>

    <div mat-dialog-content>
      <p>{{ message }}</p>
    </div>

    <div mat-dialog-actions>
      <button mat-button (click)="onDismiss()">No</button>
      <button mat-flat-button color="primary" (click)="onConfirm()">
        Yes
      </button>
    </div>
  `,
  styles: [`
    button {
      margin-right: 10px;
    }
  `]
})
export class ConfirmDialogComponent implements OnInit {
  title: string;
  message: string;

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Update view with given values
    this.title = data.title;
    this.message = data.message;
  }

  ngOnInit() {}

  onConfirm(): void {
    // Close the dialog, return true
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }
}
