import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { filter, map, tap } from 'rxjs';
import { ActionType } from '../../models/action-type.model';
import { Book, BookDialogData, BookTableColumns } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatButtonModule
  ],
  providers: [DialogService],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageIndex = 0;
  pageSize = 5;
  columnHeaders = new Map<string, string>([
    ['position', 'Position'],
    ['title', 'Title'],
    ['author', 'Author'],
    ['description', 'Description'],
    ['yearOfPublishing', 'Year of Publishing'],
    ['star', 'Show More']
  ]);
  displayedColumns = [
    BookTableColumns.POSITION,
    BookTableColumns.TITLE,
    BookTableColumns.AUTHOR,
    BookTableColumns.DESCRIPTION,
    BookTableColumns.YEAR_OF_PUBLISHING,
    BookTableColumns.SHOW_MORE
  ];
  bookTableColumns = BookTableColumns;
  dataSource = new MatTableDataSource<Book>([]);

  constructor(
    private bookService: BookService, private dialogService: DialogService) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator.page.subscribe((event) => {
      this.pageIndex = event.pageIndex;
      this.pageSize = event.pageSize;
    });
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Book>(this.bookService.getAllBooks());
  }

  getTableRow() {
    return Array.from(this.displayedColumns.values()).map(col => col);
  }

  viewDetails(rowData: Book): void {
    const data = { book: rowData, action: ActionType.VIEW };
    this.dialogService.openDialog(data).subscribe();
  }

  edit(rowData: Book): void {
    const data = { book: rowData, action: ActionType.EDIT };
    this.dialogService.openDialog(data)
      .pipe(
        filter(Boolean),
        map((book: Book) => this.bookService.updateBookDetails(book)),
        tap(() => {
          this.dataSource = new MatTableDataSource(this.bookService.getAllBooks());
          this.dataSource.paginator = this.paginator;
        })
      ).subscribe();
  }

  remove(rowData: Book): void {
    const data = { book: rowData, action: ActionType.REMOVE };

    this.dialogService.openDialog(data).pipe(
      filter(Boolean),
      map((data: BookDialogData) => this.bookService.deleteBookById(data.book.id)),
      tap(() => {
        this.dataSource = new MatTableDataSource(this.bookService.getAllBooks());
        this.dataSource.paginator = this.paginator;
      })
    ).subscribe();
  }

  addBook(): void {
    const data = { book: {} as Book, action: ActionType.CREATE };
    this.dialogService.openDialog(data)
      .pipe(
        filter(Boolean),
        map((book: Book) => this.bookService.createBook(book)),
        tap(() => {
          this.dataSource = new MatTableDataSource(this.bookService.getAllBooks());
          this.dataSource.paginator = this.paginator;
        })
      ).subscribe();
  }

}
