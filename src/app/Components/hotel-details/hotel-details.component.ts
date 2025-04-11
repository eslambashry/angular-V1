import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HotelService } from '../../services/hotels.service';
import { NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
 import { FormsModule } from '@angular/forms'; // ✅ import this

@Component({
  selector: 'app-hotel-details',
  standalone: true,
  imports: [CommonModule,RouterLink,NgbDatepickerModule,FormsModule],
  templateUrl: './hotel-details.component.html',
  styleUrl: './hotel-details.component.css'
})
export class HotelDetailsComponent implements OnInit{

  property: any;
  isLoading = true;

constructor(
  private route: ActivatedRoute,
  private hotelService: HotelService
) {}
availableDates: string[] = [];
mainPhotoUrl: string = ''; // ✅ Add this line

ngOnInit(): void {
  setTimeout(() => {

  const productId = this.route.snapshot.paramMap.get('id')
  // console.log(productId,"productId");
  this.hotelService.getHotelsById(productId).subscribe((response) => {
    this.property = response.productExsist;
    console.log(this.property);
     
    this.mainPhotoUrl = this.property.photos[0]?.url; // ✅ Set the default main image
    this.availableDates = this.property.bookingDetails.availableDates.map((date: string) => {
      const d = new Date(date);
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    });
  });
  this.isLoading = false;
    }, 2000);
}
model: NgbDateStruct | undefined;

isDisabled = (date: NgbDateStruct, current?: { year: number; month: number }) => {
  if (!this.property?.bookingDetails?.availableDates) return true;

  const available = this.property.bookingDetails.availableDates.map((d: string) => {
    const obj = new Date(d);
    return { year: obj.getFullYear(), month: obj.getMonth() + 1, day: obj.getDate() };
  });

  return !available.some((av: { year: number; month: number; day: number; }) => av.year === date.year && av.month === date.month && av.day === date.day);
}
}



