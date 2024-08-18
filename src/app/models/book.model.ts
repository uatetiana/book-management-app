import { ActionType } from './action-type.model';

export interface Book {
    id: number;
    title: string;
    author: string;
    yearOfPublishing: number;
    description?: string;
    bookCover?: string;
}

export enum BookTableColumns {
    POSITION = 'position',
    TITLE = 'title',
    AUTHOR = 'author',
    DESCRIPTION = 'description',
    YEAR_OF_PUBLISHING = 'yearOfPublishing',
    SHOW_MORE = 'star'
}

export interface BookDialogData {
    book: Book;
    action: ActionType;
    title?: string;
}