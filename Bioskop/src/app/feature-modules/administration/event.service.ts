import { Injectable } from '@angular/core';
import { Event } from './model/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private events: Event[] = [
    {
      id: 1,
      name: 'Summer Blockbuster Premiere',
      type: 'premiere',
      date: '2024-06-15',
      time: '18:00',
      location: 'Cinema Hall 1',
      description: 'Premiere of the latest summer blockbuster movie.',
      movie: 'Summer Blockbuster',
      specialPrice: 15,
      active: true,
    },
    {
      id: 2,
      name: 'Thematic Week: Classic Movies',
      type: 'thematicWeek',
      date: '2024-07-01',
      time: '16:00',
      location: 'Cinema Hall 2',
      description: 'A week-long celebration of classic movies.',
      movie: 'Various Classic Movies',
      discount: 20,
      discountCondition: 'Applies to all screenings during the week',
      active: true,
    },
    {
      id: 3,
      name: 'Horror Movie Marathon',
      type: 'movieMarathon',
      date: '2024-10-31',
      time: '20:00',
      location: 'Cinema Hall 3',
      description: 'A marathon of the scariest horror movies.',
      movie: 'Various Horror Movies',
      discount: 10,
      active: true,
    },
    {
      id: 4,
      name: 'Kids Matinee: Animated Favorites',
      type: 'birthday',
      date: '2024-08-10',
      time: '10:00',
      location: 'Cinema Hall 4',
      description: 'A special matinee showing of favorite animated movies for kids.',
      movie: 'Various Animated Movies',
      active: true,
    },
    {
      id: 5,
      name: 'Indie Film Festival',
      type: 'thematicWeek',
      date: '2024-09-15',
      time: '14:00',
      location: 'Cinema Hall 5',
      description: 'A festival showcasing the best independent films.',
      movie: 'Various Indie Films',
      discount: 15,
      discountCondition: 'Applies to screenings between 14:00 - 18:00',
      active: true,
    }
  ];

  getEvents(): Event[] {
    return this.events;
  }

  getEvent(id: number): Event | undefined {
    return this.events.find(event => event.id === id);
  }

  addEvent(event: Event): void {
    this.events.push(event);
  }
}
