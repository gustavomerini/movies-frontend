import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-field',
  template: `
    <mat-form-field appearance="outline" class="field" [formGroup]="parentForm">
      <mat-label>{{ label }}</mat-label>
      <input matInput [formControlName]="field" />
      <mat-error *ngIf="parentForm.get(field).invalid">{{
        getErrorMessage(field)
      }}</mat-error>
    </mat-form-field>
  `,
  styles: [
    `
      .field {
        width: 100%;
      }
    `,
  ],
})
export class FormFieldComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Input() field: string;
  @Input() label: string;
  constructor() {}

  ngOnInit() {
    this.parentForm.reset();
    console.log(this.field, this.label);
  }

  getErrorMessage(field: string) {
    if (this.parentForm.get(field).hasError('required')) {
      return `You must enter a ${field}`;
    }

    return this.parentForm.get(field).hasError('email')
      ? 'Not a valid email'
      : '';
  }
}
