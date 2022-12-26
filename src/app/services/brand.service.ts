import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ListResponseModel } from '../models/listResponseModel';
import { Brand } from '../models/brand';
import { ResponseModel } from '../models/responseModel';
import { EntityResponseModel } from '../models/entityResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  apiUrl="https://localhost:44351/api/brands/"
  constructor(private httpclient:HttpClient) { }

  getBrands():Observable<ListResponseModel<Brand>>{
    return this.httpclient.get<ListResponseModel<Brand>>(this.apiUrl+"getall");
  }

  addBrand(brand:Brand):Observable<ResponseModel>{
    return this.httpclient.post<ResponseModel>(this.apiUrl+"add",brand);
  }

  updateBrand(brand:Brand):Observable<ResponseModel>{
    return this.httpclient.put<ResponseModel>(this.apiUrl+"update",brand);
  }

  getBrandById(id:number):Observable<EntityResponseModel<Brand>>{
    return this.httpclient.get<EntityResponseModel<Brand>>(this.apiUrl+"getbyid?id="+id);
  }
}
