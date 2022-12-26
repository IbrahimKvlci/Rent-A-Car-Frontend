import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDetails } from '../models/carDetails';
import { EntityResponseModel } from '../models/entityResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarDetailService {
  private apiUrl="https://localhost:44351/api/"
  constructor(private httpClient:HttpClient) { }

  getCarDetailsByCarId(carId:number):Observable<EntityResponseModel<CarDetails>>{
    let newPath=this.apiUrl+"cars/getcardetailsbycarid?carId="+carId
    return this.httpClient.get<EntityResponseModel<CarDetails>>(newPath)
  }
}
