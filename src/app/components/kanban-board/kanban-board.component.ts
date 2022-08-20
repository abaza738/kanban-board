import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ITicket, TicketStatus } from '../../models/ticket.model';
import { TicketService } from '../../services/ticket.service';
import { CreateTicketDialogComponent } from '../create-ticket-dialog/create-ticket-dialog.component';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss']
})
export class KanbanBoardComponent implements OnInit {
  tickets: ITicket[] = [];
  isLoading: boolean = false;
  newTickets: Observable<ITicket[]> = this.ticketService.newTickets$.asObservable();
  inProgressTickets: Observable<ITicket[]> = this.ticketService.inProgressTickets$.asObservable();
  doneTickets: Observable<ITicket[]> = this.ticketService.doneTickets$.asObservable();

  constructor(
    private dialog: MatDialog,
    private ticketService: TicketService
  ) { }

  ngOnInit(): void {
    this.getTickets();
  }
  
  getTickets() {
    this.isLoading = true;
    this.ticketService.getTickets().subscribe({
      error: console.error,
      complete: () => this.isLoading = false
    });  
  }

  createTicket() {
    this.dialog.open(CreateTicketDialogComponent, {
      width: '40vw'
    }).afterClosed().subscribe({
      next: this.pushTicket.bind(this),
      error: console.error
    });
  }

  pushTicket(ticket?: ITicket) {
    if (!ticket) return;
    const variable = ticket.status === TicketStatus.NEW ? 'newTickets$' : ticket.status === TicketStatus.IN_PROGRESS ? 'inProgressTickets$' : 'doneTickets$';
    this.ticketService[variable].next([...this.ticketService[variable].value, ticket]);
  }

}
