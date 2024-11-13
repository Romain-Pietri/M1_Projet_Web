// models/rating.model.ts
export interface Comment {
    id: string;
    user: string;
    comment: string | null; 
    rating: number;
    createdAt: string; 
    bookId: string; 
  }
  