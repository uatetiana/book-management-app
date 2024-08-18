import { Component, Inject, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BookDetailsComponent } from '../components/book-details/book-details.component';
import { BookFormComponent } from '../components/book-form/book-form.component';
import { DeleteBookComponent } from '../components/delete-book/delete-book.component';
import { ActionType } from '../models/action-type.model';
import { BookDialogData } from '../models/book.model';

@Component({
  selector: 'app-dynamic-dialog',
  standalone: true,
  imports: [MatDialogModule, BookDetailsComponent, BookFormComponent, DeleteBookComponent],
  templateUrl: './dynamic-dialog.component.html',
  styleUrl: './dynamic-dialog.component.scss'
})
export class DynamicDialogComponent implements OnInit {
  @ViewChild('dynamicComponent', { read: ViewContainerRef, static: true }) viewContainerRef!: ViewContainerRef;

  constructor(
    public dialogRef: MatDialogRef<DynamicDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BookDialogData
  ) { }

  ngOnInit(): void {
    const component = this.getComponentByAction(this.data.action);
    const componentFactory = this.viewContainerRef.createComponent<BookDetailsComponent | BookFormComponent | DeleteBookComponent>(component);
    componentFactory.instance.data = this.data;
  }

  getComponentByAction(action: string) {
    switch (action) {
    case ActionType.VIEW:
      return BookDetailsComponent;
    case ActionType.EDIT:
    case ActionType.CREATE:
      return BookFormComponent;
    case ActionType.REMOVE:
      return DeleteBookComponent;
    default:
      return BookDetailsComponent;
    }
  }
}
