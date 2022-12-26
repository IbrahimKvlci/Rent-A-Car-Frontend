import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  paymentForm:FormGroup;
  paid:boolean=false;
  constructor(private dialogRef:MatDialogRef<PaymentComponent>,private router:Router,private toastrService:ToastrService,@Inject(MAT_DIALOG_DATA) public data:number) {this.createPaymentForm() }

  
  ngOnInit(): void {

  }

  createPaymentForm(){
    this.paymentForm=new FormGroup({
      personName:new FormControl("",Validators.required),
      cardNumber:new FormControl("",Validators.required),
      expiry:new FormControl("",Validators.required),
      cvc:new FormControl("",Validators.required)
    })
  }

  pay(){
    if(this.paymentForm.valid){
      this.paid=true;
      this.toastrService.success("Payment is successful!")
      this.dialogRef.close({data:this.paid});
    }else{
      this.toastrService.error("Please Enter True Values!")
    }
    
  }


}
