import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginserviceService} from "../../service/loginservice.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginserviceService,private router: Router) { }
  ngOnInit(): void {
  }

  formlogin = new FormGroup({
    username: new FormControl("",Validators.required),
    password: new FormControl("",Validators.required)
  })

  login(){
    this.loginService.login(this.formlogin.value).subscribe((data)=>{
      this.loginService.setUserToken(data);
      this.loginService.setToken(data.token);
      this.loginService.checkrole()
    })
  }






}
