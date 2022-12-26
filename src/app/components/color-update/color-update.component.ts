import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {

  colorUpdateForm:FormGroup;
  color:Color;

  constructor(private toastrService:ToastrService,private activatedRoute:ActivatedRoute,private colorService:ColorService) {
    this.createColorUpdateForm();
   }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.getColorById(params["colorId"]);
    })
  }

  update(){
    if(this.colorUpdateForm.valid){
      let colorModel=Object.assign({id:this.color.id},this.colorUpdateForm.value)
      this.colorService.updateColor(colorModel).subscribe(response=>{
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
    this.colorUpdateForm=new FormGroup({
      name:new FormControl("",Validators.required)
    })
  }

  getColorById(id:number){
    this.colorService.getColorById(id).subscribe(response=>{
      this.color=response.data;
      this.colorUpdateForm.controls["name"].setValue(response.data.name);
    })
  }

}
