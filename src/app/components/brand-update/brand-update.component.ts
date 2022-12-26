import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {

  brandUpdateForm:FormGroup;
  brand:Brand;

  constructor(private toastrService:ToastrService,private activatedRoute:ActivatedRoute,private brandService:BrandService) {
    this.createColorUpdateForm();
   }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.getBrandById(params["brandId"]);
    })
  }

  update(){
    if(this.brandUpdateForm.valid){
      let colorModel=Object.assign({id:this.brand.id},this.brandUpdateForm.value)
      this.brandService.updateBrand(colorModel).subscribe(response=>{
        this.toastrService.success("Updated!");
      },errorResponse=>{
        if(errorResponse.error.Errors.length>0){
          for (let i = 0; i < errorResponse.error.Errors.length; i++) {
            this.toastrService.error(errorResponse.error.Errors[i].ErrorMessage);
            
          }
        }
      })
    }
  }

  createColorUpdateForm(){
    this.brandUpdateForm=new FormGroup({
      name:new FormControl("",Validators.required)
    })
  }

  getBrandById(id:number){
    this.brandService.getBrandById(id).subscribe(response=>{
      this.brand=response.data;
      this.brandUpdateForm.controls["name"].setValue(response.data.name);
    })
  }
}
