import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RentalComponent } from './components/rental/rental.component';

const routes: Routes = [
  {path:"",pathMatch:"full",component:CarComponent},
  {path:"cars",component:CarComponent},
  {path:"brands/:brandId",component:CarComponent},
  {path:"colors/:colorId",component:CarComponent},
  {path:"admin/colors/add",component:ColorAddComponent},
  {path:"admin/brands/add",component:BrandAddComponent},
  {path:"admin/cars/add",component:CarAddComponent},
  {path:"admin/cars/update/:carId",component:CarUpdateComponent},
  {path:"admin/colors/update/:colorId",component:ColorUpdateComponent},
  {path:"admin/brands/update/:brandId",component:BrandUpdateComponent},
  {path:"login",component:LoginComponent},
  {path:"rental/:carId",component:RentalComponent},
  {path:"rental/:carId/payment",component:PaymentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
