import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { EntityResponseModel } from '../models/entityResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  private apiUrl="https://localhost:44351/api/colors/"

  constructor(private httpClient:HttpClient) { }

  getColors():Observable<ListResponseModel<Color>>{
    return this.httpClient.get<ListResponseModel<Color>>(this.apiUrl+"getAll");
  }

  addColor(color:Color):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"add",color)
  }

  getColorById(id:number):Observable<EntityResponseModel<Color>>{
    return this.httpClient.get<EntityResponseModel<Color>>(this.apiUrl+"getbyid?id="+id);
  }

  updateColor(color:Color):Observable<ResponseModel>{
    return this.httpClient.put<ResponseModel>(this.apiUrl+"update",color);
  }
}
