import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarDetails } from 'src/app/models/carDetails';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  carUpdateForm:FormGroup
  brands:Brand[]=[]
  colors:Color[]=[]
  updateCarDetails:CarDetails
  updateCar:Car
  imagesPath:string[]=[]
  file:File;

  constructor(private carImageService:CarImageService,private activatedRoute:ActivatedRoute,private toastrService:ToastrService,private carService:CarService,private brandService:BrandService,private colorService:ColorService) {this.createCarUpdateForm() }

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
    this.activatedRoute.params.subscribe(params=>{
      this.getCarByCarId(params["carId"])
      this.getImagesByCarId(params["carId"])
    })
    
  }

  createCarUpdateForm(){
    this.carUpdateForm=new FormGroup({
      brandId:new FormControl("",Validators.required),
      colorId:new FormControl("",Validators.required),
      modelName:new FormControl("",Validators.required),
      modelYear:new FormControl("",Validators.required),
      dailyPrice:new FormControl("",Validators.required),
      description:new FormControl("",Validators.required)

    })
  }

  update(){
    if(this.carUpdateForm.valid){
      let carModel=Object.assign({id:this.updateCar.id},this.carUpdateForm.value)
      this.carService.updateCar(carModel).subscribe(response=>{
        this.toastrService.success("Car Updated!")
      },errorResponse=>{
        if(errorResponse.error.Errors.length>0){
          for (let i = 0; i < errorResponse.error.Errors.length; i++) {
            this.toastrService.error(errorResponse.error.Errors[i].ErrorMessage)
            
          }
        }
      })
    }else{
      console.log("err")
    }
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands=response.data
    })
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors=response.data
    })
  }

  getCarByCarId(carId:number){
    this.carService.getCarByCarId(carId).subscribe(response=>{
      this.updateCar=response.data;
      this.carUpdateForm.controls['brandId'].setValue(response.data.brandId);
      this.carUpdateForm.controls['colorId'].setValue(response.data.colorId);
      this.carUpdateForm.controls['modelName'].setValue(response.data.modelName);
      this.carUpdateForm.controls['modelYear'].setValue(response.data.modelYear);
      this.carUpdateForm.controls['dailyPrice'].setValue(response.data.dailyPrice);
      this.carUpdateForm.controls['description'].setValue(response.data.description);
    })
  }

  getImagesByCarId(carId:number){
    this.carService.getCarDetailsByCarId(carId).subscribe(response=>{
      for (let i = 0; i < response.data.imagePath.length; i++) {
        this.imagesPath.push(response.data.imagePath[i].imagePathForShow);
      }
      console.log(this.imagesPath)
    })
  }

  onChange(event: any) {
    this.file = event.target.files[0];
    this.activatedRoute.params.subscribe(params=>{
      console.log(params["carId"])
      this.uploadFile(this.file,params["carId"])
    })
  }

  uploadFile(file:File,carId:number){
    this.carImageService.uploadCarImage(file,carId.toString()).subscribe(response=>{
      console.log(carId);
      this.toastrService.success(response.message);
    })
  }

  
}
