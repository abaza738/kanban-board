import { Component, Input, OnInit } from '@angular/core';
import { ITicket, TicketStatus } from '../../models/ticket.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() title: string = '';
  @Input() tickets: ITicket[] = [];
  @Input() type!: TicketStatus;

  constructor() { }

  ngOnInit(): void {
  }

}
