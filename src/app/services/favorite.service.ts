import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private favoriteCountSubject = new BehaviorSubject<number>(0);
  favoriteCount$ = this.favoriteCountSubject.asObservable();

  constructor() {
    this.updateFavoriteCount();
  }

  getFavorites(): any[] {
    if (typeof window !== 'undefined' && localStorage) {
      return JSON.parse(localStorage.getItem('favorites') || '[]');
    }
    return [];
  }

  toggleFavorite(property: any): void {
    if (typeof window !== 'undefined' && localStorage) {
      let favorites = this.getFavorites();

      if (this.isFavorite(property)) {
        favorites = favorites.filter((item: any) => item._id !== property._id);
      } else {
        favorites.push(property);
      }

      localStorage.setItem('favorites', JSON.stringify(favorites));
      this.updateFavoriteCount();
    }
  }

  isFavorite(property: any): boolean {
    return this.getFavorites().some((item: any) => item._id === property._id);
  }

  updateFavoriteCount(): void {
    const count = this.getFavorites().length;
    this.favoriteCountSubject.next(count);
  }
}
