import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shared-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shared-alert.component.html',
  styleUrl: './shared-alert.component.css'
})
export class SharedAlertComponent {
  @Input() type: string = 'primary'; // Default alert type
  @Input() message: string = ''; // Default message is empty

  alertTypeClass(): string {
    return `alert alert-${this.type}`;
  }

}
