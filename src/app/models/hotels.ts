export interface Location {
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
}

export interface Owner {
  id?: string; // Assuming User ID
  name?: string;
  email?: string;
}

export interface Photo {
  url?: string;
  caption?: string;
}

export interface Review {
  reviewId?: string;
  userId?: string;
  rating?: number;
  comment?: string;
  date?: Date;
}

export interface BookingDetails {
  checkInDate?: Date;
  checkOutDate?: Date;
  availableDates?: Date[];
}

export interface Hotel {
  _id?: string;
  title: string;
  description?: string;
  price?: number;
  location?: Location;
  owner?: Owner;
  amenities?: string[];
  photos?: Photo[];
  reviews?: Review[];
  rating?: number;
  bookingDetails?: BookingDetails;
  type?: 'Entire home' | 'Private room' | 'Shared room';
}
