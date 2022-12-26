import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  carAddForm:FormGroup
  brands:Brand[]=[]
  colors:Color[]=[]

  constructor(private toastrService:ToastrService,private carService:CarService,private brandService:BrandService,private colorService:ColorService) {this.createCarAddForm() }

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
  }

  createCarAddForm(){
    this.carAddForm=new FormGroup({
      brandId:new FormControl("",Validators.required),
      colorId:new FormControl("",Validators.required),
      modelName:new FormControl("",Validators.required),
      modelYear:new FormControl("",Validators.required),
      dailyPrice:new FormControl("",Validators.required),
      description:new FormControl("",Validators.required)

    })
  }

  add(){
    if(this.carAddForm.valid){
      let carModel=Object.assign({},this.carAddForm.value)
      console.log(carModel)
      this.carService.addCar(carModel).subscribe(response=>{
        this.toastrService.success("Car Added!")
      },errorResponse=>{
        if(errorResponse.error.Errors.length>0){
          for (let i = 0; i < errorResponse.error.Errors.length; i++) {
            this.toastrService.error(errorResponse.error.Errors[i].ErrorMessage)
            
          }
        }
      })
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

}

