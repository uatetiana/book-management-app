import { Injectable } from '@angular/core';
import { books } from '../mock-data';
import { Book } from '../models/book.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private books: Book[] = [];

  constructor(private localStorage: LocalStorageService) { }

  getAllBooks(): Book[] {
    if (!this.localStorage.getItem('books')) {
      this.localStorage.setItem('books', books);
    }
    this.books = this.localStorage.getItem<Book[]>('books') ?? [];
    return this.books;
  }

  getBookById(id: number): Book {
    if (!this.books.length) {
      this.getAllBooks();
    }
    return this.books.find(book => book.id === +id)!;
  }

  createBook(book: Book): void {
    this.books = [...this.books, book];
    this.localStorage.setItem('books', this.books);
  }

  updateBookDetails(book: Book): void {
    this.books = this.books.map(b => b.id === book.id ? book : b);
    this.localStorage.setItem('books', this.books);
  }

  deleteBookById(id: number): void {
    this.books = this.books.filter(book => book.id !== id);
    this.localStorage.setItem('books', this.books);
  }
}
