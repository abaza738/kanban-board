import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Priority, TicketStatus } from 'src/app/models/ticket.model';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-create-ticket-dialog',
  templateUrl: './create-ticket-dialog.component.html',
  styleUrls: ['./create-ticket-dialog.component.scss']
})
export class CreateTicketDialogComponent implements OnInit {
  form: FormGroup = new FormGroup({
    title: new FormControl('', { validators: Validators.required }),
    status: new FormControl({ value: TicketStatus.NEW, disabled: false }),
    priority: new FormControl({ value: Priority.NORMAL, disabled: false }),
    description: new FormControl('', { validators: Validators.required })
  });

  constructor(
    public dialogRef: MatDialogRef<CreateTicketDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ticketSerivce: TicketService
  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.form.patchValue(this.data);
    }
  }

  save() {
    this.data ? this.editTicket() : this.createTicket();
  }

  createTicket() {
    this.ticketSerivce.createTicket(this.form.value).subscribe({
      next: this.close.bind(this),
      error: console.error
    });
  }

  editTicket() {
    const value = {
      ...this.data,
      ...this.form.value
    };
    this.ticketSerivce.editTicket(value).subscribe({
      next: this.close.bind(this),
      error: console.error
    });
  }

  close(data?: any) {
    this.dialogRef.close(data);
  }

}
