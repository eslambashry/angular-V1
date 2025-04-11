import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { HotelService } from '../../services/hotels.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/userAuth/user-auth.service';
import { SharedAlertComponent } from '../shared-alert/shared-alert.component';

@Component({
  selector: 'app-add-hotel',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SharedAlertComponent],
  templateUrl: './add-hotel.component.html',
  styleUrl: './add-hotel.component.css'
})
export class AddHotelComponent implements OnInit {
  hotelForm: FormGroup;
  userId: string | null = null;
  userName: string | null = null;
  userEmail: string | null = null;
  amenitiesList = [
    "WiFi", "Heating", "Kitchen", "Pool", "Private Beach", "Fireplace",
    "Hot Tub", "Parking", "Gym", "Rooftop", "Concierge", "Backyard",
    "Air Conditioning", "Beach Access", "Garden"
  ];
  selectedAmenities: string[] = [];
  showAddedSuccessfull: boolean = false;
  showAddedErorr: boolean = false;
  showAddedMessage: string = "";
  isLoading = true;
  
  // File upload properties
  selectedFile: File | null = null;
  imagePreview: string | null = null;

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
      ownerId: [''],
      ownerName: [''],
      ownerEmail: [''],
      reviews: this.fb.array([]),
      rating: [''],
      bookingDetails: this.fb.group({
        checkInDate: [''],
        checkOutDate: [''],
        availableDates: this.fb.array([])
      }),
      type: [''],
      amenities: [[]],
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

  // Append new amenities to the list without replacing existing ones
  onAmenitiesChange(event: Event): void {
    const selectedOptions = Array.from((event.target as HTMLSelectElement).selectedOptions).map(option => option.value);

    selectedOptions.forEach(option => {
      if (!this.selectedAmenities.includes(option)) {
        this.selectedAmenities.push(option);
      }
    });

    this.hotelForm.get('amenities')?.setValue(this.selectedAmenities);
  }

  // Remove an amenity
  removeAmenity(index: number): void {
    this.selectedAmenities.splice(index, 1);
    this.hotelForm.get('amenities')?.setValue(this.selectedAmenities);
  }

  // Simplified file selection handler
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  // Remove the selected image
  removeImage(): void {
    this.selectedFile = null;
    this.imagePreview = null;
  }

  onSubmit() {
    if (this.hotelForm.valid) {
      if (!this.selectedFile) {
        this.showAddedSuccessfull = false;
        this.showAddedErorr = true;
        this.showAddedMessage = "Please provide a hotel image";
        setTimeout(() => {
          this.showAddedErorr = false;
        }, 3000);
        return;
      }
  
      // Create FormData to handle file upload
      const formData = new FormData();
      
      // Get form values
      const formValues = this.hotelForm.value;
      
      // Add basic fields
      formData.append('title', formValues.title || '');
      formData.append('description', formValues.description || '');
      formData.append('price', formValues.price?.toString() || '');
      formData.append('type', formValues.type || '');
      
      // Add owner information
      formData.append('ownerId', formValues.ownerId || '');
      formData.append('ownerName', formValues.ownerName || '');
      formData.append('ownerEmail', formValues.ownerEmail || '');
      
      // Add location as a JSON string
      if (formValues.location) {
        const locationJson = JSON.stringify({
          address: formValues.location.address || '',
          city: formValues.location.city || '',
          state: formValues.location.state || '',
          country: formValues.location.country || '',
          zipCode: formValues.location.zipCode || ''
        });
        formData.append('location', locationJson);
      }
      
      // Add amenities as a JSON string
      if (formValues.amenities) {
        formData.append('amenities', JSON.stringify(formValues.amenities));
      }
      
      // Add reviews as an empty array JSON string
      formData.append('reviews', JSON.stringify([]));
      
      // Add rating
      if (formValues.rating) {
        formData.append('rating', formValues.rating.toString());
      }
      
      // Add bookingDetails as a JSON string
      if (formValues.bookingDetails) {
        const bookingJson = JSON.stringify({
          checkInDate: formValues.bookingDetails.checkInDate || '',
          checkOutDate: formValues.bookingDetails.checkOutDate || '',
          availableDates: formValues.bookingDetails.availableDates || []
        });
        formData.append('bookingDetails', bookingJson);
      }
      
      // Add the file with the correct field name 'photos'
      formData.append('photos', this.selectedFile);
      
      this.hotelService.addProductWithImage(formData).subscribe(
        response => {
          this.hotelForm.reset();
          this.selectedFile = null;
          this.imagePreview = null;
          this.showAddedSuccessfull = true;
          this.showAddedErorr = false;
          this.showAddedMessage = "Hotel Added Successfully";
          console.log('Product added successfully', response);
  
          setTimeout(() => {
            this.showAddedSuccessfull = false;
          }, 3000);
        },
        error => {
          console.error('Error adding product', error);
          this.showAddedSuccessfull = false;
          this.showAddedErorr = true;
          this.showAddedMessage = error.error?.message || "Error adding product";
          setTimeout(() => {
            this.showAddedErorr = false;
          }, 3000);
        }
      );
    } else {
      this.showAddedSuccessfull = false;
      this.showAddedErorr = true;
      this.showAddedMessage = "Please Enter Your Data";
      setTimeout(() => {
        this.showAddedErorr = false;
      }, 3000);
    }
  }
  
}
