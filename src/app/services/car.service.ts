import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDetails } from '../models/carDetails';
import { EntityResponseModel } from '../models/entityResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiUrl="https://localhost:44351/api/"

  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<CarDetails>>{
    let newPath=this.apiUrl+"cars/getcardetails"
    return this.httpClient.get<ListResponseModel<CarDetails>>(newPath)
  }

  getCarsByBrand(barndId:number):Observable<ListResponseModel<CarDetails>>{
    let newPath=this.apiUrl+"cars/getcardetailsbybrandid?brandId="+barndId
    return this.httpClient.get<ListResponseModel<CarDetails>>(newPath)
  }

  getCarsByColor(colorId:number):Observable<ListResponseModel<CarDetails>>{
    let newPath=this.apiUrl+"cars/getcardetailsbycolorid?colorId="+colorId
    return this.httpClient.get<ListResponseModel<CarDetails>>(newPath)
  }

  addCar(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"cars/add",car)
  }

  updateCar(car:Car):Observable<ResponseModel>{
    return this.httpClient.put<ResponseModel>(this.apiUrl+"cars/update",car)
  }

  getCarDetailsByCarId(carId:number):Observable<EntityResponseModel<CarDetails>>{
    return this.httpClient.get<EntityResponseModel<CarDetails>>(this.apiUrl+"cars/getcardetailsbycarid?carId="+carId)
  }

  getCarByCarId(carId:number):Observable<EntityResponseModel<Car>>{
    return this.httpClient.get<EntityResponseModel<Car>>(this.apiUrl+"cars/getcarbycarid?carId="+carId)
  }

  getCarsByFilter(brandId:number,colorId:number):Observable<ListResponseModel<CarDetails>>{
    return this.httpClient.get<ListResponseModel<CarDetails>>(this.apiUrl+"cars/getbybrandidandcolorid?brandId="+brandId+"&colorId="+colorId);
  }

}
