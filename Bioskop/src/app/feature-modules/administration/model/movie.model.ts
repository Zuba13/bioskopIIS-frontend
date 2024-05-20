import { Actor } from './actor.model';
import { Director } from './director.model';
import { Projection } from './projection.model';

export interface Movie {
  id: number;
  title: string;
  year: number;
  genre: string;
  rating: number;
  numVotes: number;
  duration: number;
  language: string;
  defaultPrice: number;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  projections?: Projection[] | null;
  actors: Actor[]; 
  directors: Director[];
}
