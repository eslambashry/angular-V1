import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  createBooking(booking: any): Observable<any> {
    return this.http.post( `https://airbnb-backend-plum.vercel.app/bookings`, booking);
  }

}
