import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {

  colorAddForm:FormGroup;
  constructor(private colorService:ColorService,private toastrService:ToastrService) {
    this.createColorAddForm();
   }

  ngOnInit(): void {
  }

  createColorAddForm(){
    this.colorAddForm=new FormGroup({
      name:new FormControl("",Validators.required)
    })
  }

  add(){
    if(this.colorAddForm.valid){
      let colorModel=Object.assign({},this.colorAddForm.value)
      this.colorService.addColor(colorModel).subscribe(response=>{
        this.toastrService.success("Color Added!")
      },responseError=>{
        if(responseError.error.Errors.length>0){
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Validation Error")
          }
        }
      })
    }
  }

}
