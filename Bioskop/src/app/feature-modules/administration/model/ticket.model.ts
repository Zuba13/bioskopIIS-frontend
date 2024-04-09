import { Projection } from './projection.model';

export interface Ticket {
  id?: number;
  userId: number;
  projectionId: number;
  rowNum: number;
  seatNum: number;
  projection?: Projection;
}
