import { Author } from './author.model';

export interface Book {
    id: string;
    title: string;
    author: Author;
    yearOfPublication: string;
    description: string;
    bookCover?: string;
}
