import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {

  brandAddForm:FormGroup
  constructor(private brandService:BrandService,private toastrService:ToastrService) {
    this.createBrandAddForm();
   }

  ngOnInit(): void {
  }

  createBrandAddForm(){
    this.brandAddForm=new FormGroup({
      name:new FormControl("",Validators.required),
      
    })
  }

  add(){
    if(this.brandAddForm.valid){
      let brandModel=Object.assign({},this.brandAddForm.value)
      this.brandService.addBrand(brandModel).subscribe(response=>{
        this.toastrService.success("Brand Added!")
      },errorResponse=>{
        if(errorResponse.error.Errors.length>0){
          for (let i = 0; i < errorResponse.error.Errors.length; i++) {
            this.toastrService.error(errorResponse.error.Errors[i].ErrorMessage)
            
          }
        }
      })
    }
  }

}
