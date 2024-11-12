export class CreateAuthorDto {
    name: string;
    birthDate: Date;
    DeathDate: Date;
    books: string[];
    biography?: string;
    imageUrl?: string;
}

