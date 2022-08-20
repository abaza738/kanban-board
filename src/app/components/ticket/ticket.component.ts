import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TicketService } from 'src/app/services/ticket.service';
import { ITicket } from '../../models/ticket.model';
import { CreateTicketDialogComponent } from '../create-ticket-dialog/create-ticket-dialog.component';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {
  @Input('data') ticket!: ITicket;

  constructor(
    private dialog: MatDialog,
    private ticketService: TicketService
  ) { }

  ngOnInit(): void {
  }

  openTicket() {
    this.dialog.open(CreateTicketDialogComponent, {
      width: '40vw',
      data: this.ticket
    }).afterClosed().subscribe({
      next: () => this.ticketService.getTickets().subscribe()
    });
  }

}
