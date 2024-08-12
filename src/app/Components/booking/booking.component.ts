import { Component, OnInit } from '@angular/core';
import { BillingDetailsComponent } from './billing-details/billing-details.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { PaymentMethodComponent } from './payment-method/payment-method.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule,BillingDetailsComponent,ConfirmationComponent,OrderSummaryComponent,PaymentMethodComponent],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent implements OnInit{

  isLoading = true;  // Set initial loading state to true

  ngOnInit(): void {
    // Simulate a loading process with a timeout or replace this with actual data fetching logic
    setTimeout(() => {
      this.isLoading = false;  // Set to false once loading is complete
    }, 2000);  // 2 seconds delay for demo, adjust accordingly
  }
}
