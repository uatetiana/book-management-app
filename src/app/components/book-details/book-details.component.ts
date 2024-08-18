import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book, BookDialogData } from '../../models/book.model';
import { DynamicDialogComponent } from '../../models/dynamic-dialog-component.model';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss'
})
export class BookDetailsComponent implements DynamicDialogComponent, OnInit {
  book!: Book;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: BookDialogData,
    private bookService: BookService
  ) { }

  ngOnInit() {
    this.book = this.bookService.getBookById(this.data.book.id);
  }
}
