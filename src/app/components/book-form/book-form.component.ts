import { Component, Inject, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { Book, BookDialogData } from '../../models/book.model';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ActionType } from '../../models/action-type.model';
import { DynamicDialogComponent } from '../../models/dynamic-dialog-component.model';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatError
  ],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss'
})
export class BookFormComponent implements DynamicDialogComponent, OnInit {
  book!: Book;
  bookForm;

  isNewBook = true;
  actionItems = ActionType;

  get bookFormValue() {
    return { ...this.bookForm.value, id: this.data?.book?.id ?? null };
  }

  constructor(
    private fb: NonNullableFormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: BookDialogData,
    public dialogRef: MatDialogRef<BookFormComponent>
  ) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      description: [''],
      yearOfPublishing: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.data?.book) {
      this.isNewBook = false;
      this.bookForm.patchValue({
        ...this.data.book,
        yearOfPublishing: this.data.book.yearOfPublishing?.toString() ?? '',
      });
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
