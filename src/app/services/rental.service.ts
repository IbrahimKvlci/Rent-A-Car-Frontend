import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EntityResponseModel } from '../models/entityResponseModel';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl="https://localhost:44351/api/rentals/"
  constructor(private httpClient:HttpClient) { }

  rent(rental:Rental):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"add",rental);
  }

  getRentalByCarId(carId:Number):Observable<EntityResponseModel<Rental>>{
    return this.httpClient.get<EntityResponseModel<Rental>>(this.apiUrl+"getbycarid?carId="+carId);
  }
}
