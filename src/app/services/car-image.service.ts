import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  private apiUrl="https://localhost:44351/api/"

  constructor(private httpClient:HttpClient) { }

  uploadCarImage(file:any,carId:string):Observable<ResponseModel>{
    const formData=new FormData();
    formData.append("image",file);
    formData.append("carId",carId);



    return this.httpClient.post<ResponseModel>(this.apiUrl+"carImages/save",formData);

  }
}
