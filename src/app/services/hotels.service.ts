import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Hotel } from '../models/hotels';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  // apiKey:string="e075aad29a4e76a0b32cf4a3e956ce9f"
  // ?key=4fa15b10
    allhotels:Subject<Hotel[]> = new Subject()

  constructor(private http:HttpClient){}
 

  getProperties():Observable<any>{
    return this.http.get(`https://backend-angular-project.vercel.app/getAllproducts`)
  }

  getHotelsById(id:any):Observable<any>{
    return this.http.get(`https://backend-angular-project.vercel.app/getProductById/${id}`)

  }

  addProduct(formData: Hotel): Observable<any> {
    return this.http.post( `https://backend-angular-project.vercel.app/addNewproduct`, formData);
  }

  addProductWithImage(formData: FormData): Observable<any> {
    return this.http.post<any>(`https://backend-angular-project.vercel.app/addNewproduct`, formData);
  }
}