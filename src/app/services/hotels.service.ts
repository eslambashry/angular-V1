import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { hotel } from '../models/hotels';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  // apiKey:string="e075aad29a4e76a0b32cf4a3e956ce9f"
  // ?key=4fa15b10
    allhotels:Subject<hotel[]> = new Subject()

  constructor(private http:HttpClient){}
 

  getProperties():Observable<any>{
    return this.http.get(`http://localhost:3001/getAllproducts`)
  }

  getHotelsById(id:any):Observable<any>{
    return this.http.get(`http://localhost:3001/getProductById/${id}`)

  }

}