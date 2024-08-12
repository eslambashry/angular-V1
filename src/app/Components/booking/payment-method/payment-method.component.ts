import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-payment-method',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './payment-method.component.html',
  styleUrl: './payment-method.component.css'
})
export class PaymentMethodComponent {
  paymentMethod: string = 'creditCard';

  onPaymentMethodChange(method: string) {
    this.paymentMethod = method;
  }
}
