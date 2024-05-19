import { User } from 'src/app/infrastructure/auth/model/user.model';
import { Movie } from './movie.model';

export interface Review {
  id?: number;
  movieId: number;
  userId: number;
  rating: number;
  comment: string;
  created_at?: string;
  movie?: Movie;
  user?: User;
}
