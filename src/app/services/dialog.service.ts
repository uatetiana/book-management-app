import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DynamicDialogComponent } from '../dynamic-dialog/dynamic-dialog.component';
import { ActionType } from '../models/action-type.model';
import { BookDialogData } from '../models/book.model';


@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openDialog({ action, book }: BookDialogData): Observable<any> {
    const dialogRef = this.dialog.open(DynamicDialogComponent, {
      width: '400px',
      data: { action, book, title: this.getDialogTitle(action) }
    });

    return dialogRef.afterClosed();
  }

  private getDialogTitle(action: string): string {
    switch (action) {
      case ActionType.VIEW: return 'Book Details';
      case ActionType.EDIT: return 'Edit Book';
      case ActionType.CREATE: return 'Create New Book';
      case ActionType.REMOVE: return 'Delete Book';
      default: return 'Book Action';
    }
  }

}
