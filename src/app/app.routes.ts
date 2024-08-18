import { Routes } from '@angular/router';
import { BookListComponent } from './pages/book-list/book-list.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Book List',
    component: BookListComponent
  }
];
