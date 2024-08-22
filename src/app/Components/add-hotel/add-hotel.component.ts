import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { HotelService } from '../../services/hotels.service';
import { Hotel } from '../../models/hotels';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/userAuth/user-auth.service';



@Component({
  selector: 'app-add-hotel',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './add-hotel.component.html',
  styleUrl: './add-hotel.component.css'
})
export class AddHotelComponent {
  hotelForm: FormGroup;
  userId: string | null = null;
  userName: string | null = null;
  userEmail: string | null = null;
  amenitiesList = [
    "WiFi", "Heating", "Kitchen", "Pool", "Private Beach", "Fireplace", 
    "Hot Tub", "Parking", "Gym", "Rooftop", "Concierge", "Backyard", 
    "Air Conditioning", "Beach Access", "Garden"
  ];
  
  constructor(
    private fb: FormBuilder,
     private hotelService: HotelService,
     private authService: AuthService,
     @Inject(PLATFORM_ID) private platformId: Object
) {
    this.hotelForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      price: ['', Validators.required],
      location: this.fb.group({
        address: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      ownerId: [''], // Hidden field for user ID
      ownerName: [''], // Hidden field for user name
      ownerEmail: [''], 
      amenities: [[]],
      photos: this.fb.array([]),
      reviews: this.fb.array([]),
      rating: [''],
      bookingDetails: this.fb.group({
        checkInDate: [''],
        checkOutDate: [''],
        availableDates: this.fb.array([])
      }),
      type: ['']
    });
  }
  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.userName = this.authService.getUserName();
    this.userEmail = this.authService.getUserEmail();

    console.log('Logged in user ID:', this.userId);
     console.log('Logged in user Name:', this.userName);
    console.log('Logged in user Email:', this.userEmail);

    this.hotelForm.patchValue({
      ownerId: this.userId,
      ownerName: this.userName,
      ownerEmail: this.userEmail
    });

    
  }
  onSubmit() {
    if (this.hotelForm.valid) {
      this.hotelService.addProduct(this.hotelForm.value).subscribe(
        response => {
          alert("Hotel Added successfully")
          console.log('Form Data:', this.hotelForm.value);
          console.log('Product added successfully', response);

          // Handle success (e.g., show a success message, reset the form)
        },
        error => {
          console.error('Error adding product', error);
          // Handle error (e.g., show an error message)
        }
      );
    }
  }
}
   
