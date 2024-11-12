import { ratingModel } from './Rating.model';
import { Author} from '../entities/author.entity';


export class BookModel {
    id: string;
    title: string;
    publicationDate: string;
    author: string; //mettre author
    price: number;
    rating?: ratingModel[];
}
