import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarDetails } from 'src/app/models/carDetails';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  cars:CarDetails[]=[]
  dataLoaded=false;
  carRentControl=false;
  filterText="";
  currentColorName:string;
  currentColorId:number=0;
  currentBrandId:number=0;
  brand:Brand;
  colors:Color[]=[];
  brands:Brand[]=[];

  constructor(private rentalService:RentalService,private carService:CarService,private activatedRoute:ActivatedRoute,private colorService:ColorService,private brandSerice:BrandService,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"]){
        this.getCarsByBrand(params["brandId"])
      }else if(params["colorId"]){
        this.getCarsByColor(params["colorId"])
      }
      else{
        this.getCars();
      }
    })
    this.getColors();
    this.getBrands();
  }
  getCars(){
    this.carService.getCars().subscribe(response=>{
      this.cars=response.data;
      this.dataLoaded=true;
    })
  }
  getCarsByBrand(brandId:number){
    this.carService.getCarsByBrand(brandId).subscribe(response=>{
      this.cars=response.data
      this.dataLoaded=true
    })
  }
  getCarsByColor(colorId:number){
    this.carService.getCarsByColor(colorId).subscribe(response=>{
      this.cars=response.data
      this.dataLoaded=true
    })
  }

  getCarImages(car:CarDetails){
    if(!car.imagePath[0]){
      return "assets/noCarImage.jpg"
    }else{
      return car.imagePath[0].imagePathForShow
    }
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors=response.data;
    })
  }

  getBrands(){
    this.brandSerice.getBrands().subscribe(response=>{
      this.brands=response.data
    })
  }

  getCarsByFilter(brandId:number,colorId:number){
    if(brandId==0&&colorId==0){
      this.getCars();
      return;
    }
    else if(brandId==0){
      this.getCarsByColor(colorId);
      return;
    }
    else if(colorId==0){
      this.getCarsByBrand(brandId);
      return;
    }else{
      this.carService.getCarsByFilter(brandId,colorId).subscribe(response=>{
        this.cars=response.data;
        this.dataLoaded=true;
      })
      return;
    }
  }

  validReturnDateOfCar(carId:number):boolean{
    this.rentalService.getRentalByCarId(carId).subscribe(response=>{
      let nowDate=new Date()
      if(new Date(response.data.returnDate).getTime()>nowDate.getTime()){
        return false
      }
      return true
    })
    return true
  }



}
