import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  constructor() {this.createLoginForm() }

  ngOnInit(): void {
  }

  createLoginForm(){
    this.loginForm=new FormGroup({
      email:new FormControl("",Validators.required),
      password:new FormControl("",Validators.required)
    })
  }

  login(){
    if(this.loginForm.valid){
      console.log(this.loginForm)
    }
  }

}
