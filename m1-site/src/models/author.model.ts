export interface Author {
    id: string;
    name: string;
    biography?: string;
    books: { id: string; title: string }[];
    birthDate: string;
    deathDate?: string;
    imageUrl?: string;
    file?: File;
  }