export interface Author {
    id: string;
    name: string;
    biography: string;
    photo: string;
    books: { id: string; title: string }[];
    birthDate: string;
    deathDate?: string;
    firstName?: string;
    lastName?: string;
    imageUrl?: string;
  }