import { Projection } from './projection.model';

export interface Movie {
  id: number;
  title: string;
  year: number;
  genre: string;
  rating: number;
  numVotes: number;
  duration: number;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  projections?: Projection[] | null; // Add Projections field
}
