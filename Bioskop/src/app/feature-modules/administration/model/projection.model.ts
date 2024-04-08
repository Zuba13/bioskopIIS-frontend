export interface Projection {
  id: number;
  movieId: number;
  hallId: number;
  price: number;
  date: string; // Assuming the date will be in ISO 8601 format, e.g., "2024-04-10T15:30:00Z"
  time: string;
  createdAt: string; // Assuming the createdAt and updatedAt will be in ISO 8601 format
  updatedAt: string;
}
