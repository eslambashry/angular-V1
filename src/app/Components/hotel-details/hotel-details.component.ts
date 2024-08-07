import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HotelService } from '../../services/hotels.service';

@Component({
  selector: 'app-hotel-details',
  standalone: true,
  imports: [CommonModule,RouterLink],
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

ngOnInit(): void {
  setTimeout(() => {

  const productId = this.route.snapshot.paramMap.get('id')
  // console.log(productId,"productId");
  
  this.hotelService.getHotelsById(productId).subscribe((response) => {
    this.property = response.productExsist;
    // console.log(this.property);
    
  });
  this.isLoading = false;
    }, 2000);
}
}



