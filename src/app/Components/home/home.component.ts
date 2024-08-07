import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelService } from '../../services/hotels.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  isLoading = true;
  properties: any[] = [];

  constructor(private HotelService: HotelService) { }

  ngOnInit(): void {
  setTimeout(() => {

    this.HotelService.getProperties().subscribe((response) => {
      if (Array.isArray(response.products)) {
        this.properties = response.products;
        // console.log(response.products);
        
      } else {
        console.error('Expected an array, but got:', response);
      }
      
    })
    this.isLoading = false;
  }, 2000);
  }
}


