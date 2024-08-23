import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { HotelService } from '../../services/hotels.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/userAuth/user-auth.service';
import { SharedAlertComponent } from '../shared-alert/shared-alert.component';



@Component({
  selector: 'app-add-hotel',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,SharedAlertComponent],
  templateUrl: './add-hotel.component.html',
  styleUrl: './add-hotel.component.css'
})
export class AddHotelComponent implements OnInit{
  hotelForm: FormGroup;
  userId: string | null = null;
  userName: string | null = null;
  userEmail: string | null = null;
  amenitiesList = [
    "WiFi", "Heating", "Kitchen", "Pool", "Private Beach", "Fireplace", 
    "Hot Tub", "Parking", "Gym", "Rooftop", "Concierge", "Backyard", 
    "Air Conditioning", "Beach Access", "Garden"
  ];
  showAddedSuccessfull: boolean = false;
  showAddedErorr: boolean = false;
  showAddedMessage: string = "" 
  isLoading = true;

  
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
  setTimeout(() => {
    
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

    this.isLoading = false;
  }, 2000);
    
  }
  
  get photos(): FormArray {
    return this.hotelForm.get('photos') as FormArray;
  }

  addPhoto(photo: { url?: string; caption?: string;} = { url: '' }): void {
    this.photos.push(this.fb.group({
      url: [photo.url || ''],
      caption: [photo.caption || ''],
    }));
  }


  onSubmit() {
    if (this.hotelForm.valid) {
      this.hotelService.addProduct(this.hotelForm.value).subscribe(
        response => {
          this.showAddedSuccessfull = true;
          this.showAddedErorr = false;
          this.showAddedMessage = "Hotel Added Successfully" 
          console.log('Form Data:', this.hotelForm.value);
          console.log('Product added successfully', response);
          this.hotelForm.reset();

          setTimeout(() => {
            this.showAddedSuccessfull= false;
            }, 3000);
        },
        error => {
          console.error('Error adding product', error);
          this.showAddedSuccessfull = false;
          this.showAddedErorr = true;
          this.showAddedMessage = "Error adding product" 
          setTimeout(() => {
            this.showAddedErorr= false;
            }, 3000);        }
      );
    }
    else{
      this.showAddedSuccessfull = false;
      this.showAddedErorr = true;
      this.showAddedMessage = "Please Enter Your Data" 
      setTimeout(() => {
        this.showAddedErorr= false;
        }, 3000);
    }
    
  }
}
   
