export interface Review {
    reviewId: string;
    propertyId: string;
    rating: number;
    comment: string;
    date: string;
  }
  
  export interface Booking {
    bookingId: string;
    propertyId: string;
    checkInDate: string;
    checkOutDate: string;
    status: string;
  }
  
  export interface User {
    _id?: string;
    Name: string;
    Email: string;
    Password?: string;
    Phone?: number;
    Profile_Picture?: string;
    verified?: boolean;
    Bio?: string;
    Role: 'Host' | 'Guest';
    Reviews?: Review[];
    Bookings?: Booking[];
    favoriteProperties?: string[];
  }
  