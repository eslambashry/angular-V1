import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent implements OnInit {
  isLoading = true;
  favoriteProducts: any[] = [];

  ngOnInit(): void {
    setTimeout(()=>{
      this.loadFavorites();
    this.isLoading = false;
    },3000)
  }

  loadFavorites(): void {
    if (typeof window !== 'undefined' && localStorage) {
      this.favoriteProducts = JSON.parse(localStorage.getItem('favorites') || '[]');
    }
  }
}
