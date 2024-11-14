export interface Book {
  id: number;
  title: string;
  publicationDate: string;
  author: string;
  price: number;
  imageUrl?: string;
  file?:File;
  averageRating?: number;
}