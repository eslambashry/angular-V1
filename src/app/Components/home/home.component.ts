import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelService } from '../../services/hotels.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterLink,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  isLoading = true;
  properties: any[] = [];
  searchTerm: string = '';
  selectedCity: string = '';
  selectedAmenity: string = '';


  constructor(private HotelService: HotelService,private favoriteService: FavoriteService) { }
  toggleFavorite(property: any): void {
    this.favoriteService.toggleFavorite(property);
  }

  isFavorite(property: any): boolean {
    return this.favoriteService.isFavorite(property);
  }
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
  get uniqueCities(): string[] {
    return [...new Set(this.properties.map(property => property.location.city))];
  }

  get uniqueAmenities(): string[] {
    const amenities = this.properties.flatMap(property => property.amenities);
    return [...new Set(amenities)];
  }

  filteredProperties(): any[] {
    return this.properties.filter(property => {
      const matchesSearch = property.title.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCity = this.selectedCity ? property.location.city === this.selectedCity : true;
      const matchesAmenity = this.selectedAmenity ? property.amenities.includes(this.selectedAmenity) : true;
      return matchesSearch && matchesCity && matchesAmenity;
    });
  }
  
}


