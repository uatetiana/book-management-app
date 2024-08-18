import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA, MatDialogActions,
  MatDialogClose,
  MatDialogContent, MatDialogRef, MatDialogTitle
} from '@angular/material/dialog';
import { BookDialogData } from '../../models/book.model';
import { DynamicDialogComponent } from '../../models/dynamic-dialog-component.model';

@Component({
  selector: 'app-delete-book',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './delete-book.component.html',
  styleUrl: './delete-book.component.scss'
})
export class DeleteBookComponent implements DynamicDialogComponent {
  data: BookDialogData;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: BookDialogData,
    public dialogRef: MatDialogRef<DeleteBookComponent>,
  ) {
    this.data = dialogData;
  }
  onCancelClick(): void {
    this.dialogRef.close();
  }
}
