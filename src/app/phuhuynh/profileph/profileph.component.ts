import { Component, OnInit } from '@angular/core';
import {ScriptService} from "../../service/script.service";
import {LoginserviceService} from "../../service/loginservice.service";

@Component({
  selector: 'app-profileph',
  templateUrl: './profileph.component.html',
  styleUrls: ['./profileph.component.css']
})
export class ProfilephComponent implements OnInit {

  constructor(private script: ScriptService, private loginService: LoginserviceService) { }

  ngOnInit(): void {

    this.script.load('global', 'bootstrap-select', 'jquerymin', 'Chartbundle', 'lightgallery-all', 'custom', 'dlabnav', 'upimg').then(data => {
    }).catch(error => console.log(error));
  }

  logout(){
    this.loginService.logout();
  }

}
