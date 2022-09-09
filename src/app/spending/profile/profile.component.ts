import { Component, OnInit } from '@angular/core';
import {ScriptService} from "../../service/script.service";
import {ProfileService} from "../../service/profile.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AppUser} from "../../model/AppUser";
import {LoginserviceService} from "../../service/loginservice.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

user: AppUser = new AppUser(0,"","","","","","",0,0,"")

  constructor(private script: ScriptService, private profileservice: ProfileService, private router: Router, private route: ActivatedRoute,private loginService: LoginserviceService) { }

  ngOnInit(): void {
    this.script.load('global','bootstrap-select','jquerymin','Chartbundle','lightgallery-all','custom','dlabnav','upimg').then(data => {
    }).catch(error => console.log(error));
    this.showUser()
  }

  showUser(){
    let id = this.loginService.getUserToken().id
    this.profileservice.show(id).subscribe((data) => {
      console.log(data)
      this.user = data;
    })
  }

}
