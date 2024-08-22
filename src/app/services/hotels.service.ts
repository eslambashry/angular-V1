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
    return this.http.get(`http://localhost:3001/getAllproducts`)
  }

  getHotelsById(id:any):Observable<any>{
    return this.http.get(`http://localhost:3001/getProductById/${id}`)

  }

  addProduct(product: Hotel): Observable<any> {
    return this.http.post( `http://localhost:3001/addNewproduct`, product);
  }
}