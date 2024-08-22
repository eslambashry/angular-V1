import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/userAuth/user-auth.service';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from '../../services/hotels.service';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent implements OnInit{
  bookingForm: FormGroup;
  userId: string | null = null;
  userName: string | null = null;
  userEmail: string | null = null;
  products: any[] = []; // To hold the list of products
  selectedProductId: string | null = null;
  property: any;

  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService,
    private authService: AuthService,
    private route: ActivatedRoute ,
    private hotelService: HotelService

  ) {
    this.bookingForm = this.fb.group({
      productId: [''], // Dropdown to select a product
      guestId: [''], // Hidden field for user ID
      guestName: [''], // Hidden field for user name
      guestEmail: [''], // Hidden field for user email
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      totalPrice: ['', Validators.required],
      status: ['Pending'],
      createdAt: ['']
    });
  }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.userName = this.authService.getUserName();
    this.userEmail = this.authService.getUserEmail();
    console.log('Logged in user ID:', this.userId);
    console.log('Logged in user Name:', this.userName);
    console.log('Logged in user Email:', this.userEmail);
    this.bookingForm.patchValue({
      guestId: this.userId,
      guestName: this.userName,
      guestEmail: this.userEmail
    });


    // Retrieve the product ID from URL params
    this.route.paramMap.subscribe(params => {
      this.selectedProductId = params.get('id');
      if (this.selectedProductId) {
        console.log('Product ID',this.selectedProductId);
        this.bookingForm.patchValue({ productId: this.selectedProductId });
      }
    });
      const productId = this.route.snapshot.paramMap.get('id')

    this.hotelService.getHotelsById(productId).subscribe((response) => {
      this.property = response.productExsist;
      // console.log(this.property);
      
    });
  }

  
  onSubmit() {
    if (this.bookingForm.valid) {
      this.bookingService.createBooking(this.bookingForm.value).subscribe(
        response => {
          alert("Booking Done Successfully")
          console.log('Form Data:', this.bookingForm.value);
          console.log('Booking created successfully', response);

        },
        error => {
          console.error('Error creating booking', error);
        }
      );
    }
  }
}


