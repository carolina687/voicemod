import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  @Output() onOrderChange = new EventEmitter<boolean>();
  orderAscending: boolean = true;

  orderChange() {
    this.orderAscending = !this.orderAscending;
    this.onOrderChange.emit(this.orderAscending);
  }
}
