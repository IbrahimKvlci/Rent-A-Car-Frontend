import { Component, OnInit } from '@angular/core';
import { CarDetails } from 'src/app/models/carDetails';
import { CarDetailService } from 'src/app/services/car-detail.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  car:CarDetails
  dataLoaded=false;

  constructor(private carDetailService:CarDetailService) { }

  ngOnInit(): void {
    this.getCarDetailsByCarId()
  }

  getCarDetailsByCarId(carId:number=1006){
    this.carDetailService.getCarDetailsByCarId(carId).subscribe(response=>{
      this.car=response.data
    })
  }


}
