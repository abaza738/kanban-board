import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { ITicket, TicketStatus } from '../models/ticket.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  allTickets$: BehaviorSubject<ITicket[]> = new BehaviorSubject<ITicket[]>([]);
  newTickets$: BehaviorSubject<ITicket[]> = new BehaviorSubject<ITicket[]>([]);
  inProgressTickets$: BehaviorSubject<ITicket[]> = new BehaviorSubject<ITicket[]>([]);
  doneTickets$: BehaviorSubject<ITicket[]> = new BehaviorSubject<ITicket[]>([]);

  constructor(
    private api: ApiService
  ) { }

  getTickets() {
    return this.api.get<ITicket[]>('http://localhost:3000/tickets').pipe(
      tap({
        next: this.classifyTickets.bind(this)
      })
    );
  }

  getTicketById(id: string) {
    return this.api.get<ITicket>(`tickets/${id}`);
  }

  createTicket(ticket: Partial<ITicket>) {
    return this.api.post<ITicket>(`tickets`, ticket);
  }

  editTicket(ticket: Partial<ITicket>) {
    return this.api.patch<ITicket>(`tickets/${ticket.id}`, ticket);
  }

  deleteTicket(id: string) {
    return this.api.delete<ITicket>(`tickets/${id}`);
  }

  classifyTickets(tickets: ITicket[]) {
    this.allTickets$.next(tickets);
    this.newTickets$.next(tickets.filter(t => t.status == TicketStatus.NEW));
    this.inProgressTickets$.next(tickets.filter(t => t.status == TicketStatus.IN_PROGRESS));
    this.doneTickets$.next(tickets.filter(t => t.status == TicketStatus.DONE));
  }
}
