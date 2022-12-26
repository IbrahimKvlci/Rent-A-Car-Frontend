import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetails } from 'src/app/models/carDetails';
import { CarService } from 'src/app/services/car.service';
import {MatDialog} from '@angular/material/dialog';
import { PaymentComponent } from '../payment/payment.component';
import { RentalService } from 'src/app/services/rental.service';
import { Rental } from 'src/app/models/rental';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {
  startDate:Date;
  endDate:Date;
  imagePaths:string[]=[]
  carDetails:CarDetails
  totalDay:number;
  rentalObject:any;
  constructor(private rentalService:RentalService,private matDialog:MatDialog,private activatedRoute:ActivatedRoute,private toastrService:ToastrService,private carService:CarService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.getCarDetails(params["carId"]);
    })
    

  }

  rentalDetails(carId:number,startDate:Date,endDate:Date){
    let rentalObject=Object.assign({customerId:1,carId:carId,rentDate:startDate,returnDate:endDate})
    this.rentalObject=rentalObject;
  }

  getCarDetails(carId:number){
    this.carService.getCarDetailsByCarId(carId).subscribe(response=>{
      for (let i = 0; i < response.data.imagePath.length; i++) {
        this.imagePaths.push(response.data.imagePath[i].imagePathForShow);
      }
      this.carDetails=response.data;
    })
  }

  calculateTotalPrice(){
    let totalTime=new Date(this.endDate).getTime()-new Date(this.startDate).getTime()
    this.totalDay=totalTime/(1000*3600*24)
  }

  rentNow(){
    let nowDate=new Date()
    if((this.totalDay>0)&&(new Date(this.startDate).getTime()>=nowDate.getTime())){
      let dialogRef=this.matDialog.open(PaymentComponent,{
        data:this.totalDay*this.carDetails.dailyPrice
      });
      dialogRef.afterClosed().subscribe(response=>{
        if(response.data){
          this.rent();
        }
      })
    }else if(this.totalDay<=0){
      this.toastrService.error("You cannot choose the return date before the start date")
    }else{
      this.toastrService.error("You cannot choose the start date before the now")
    }
  }

  rent(){
    this.activatedRoute.params.subscribe(params=>{
      this.rentalDetails(params["carId"],this.startDate,this.endDate)
    })
    console.log(this.rentalObject);
    this.rentalService.rent(this.rentalObject).subscribe(response=>{
      this.toastrService.success("Rented Successful!");
    })

  }
  

}
