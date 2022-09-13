import { Component, OnInit } from '@angular/core';
import {ScriptService} from "../../service/script.service";
import {LoginserviceService} from "../../service/loginservice.service";

@Component({
  selector: 'app-tkquanly',
  templateUrl: './tkquanly.component.html',
  styleUrls: ['./tkquanly.component.css']
})
export class TkquanlyComponent implements OnInit {

  constructor(private script: ScriptService, private loginService: LoginserviceService) { }

  ngOnInit(): void {
    this.script.load('global', 'Chartbundle', 'jquerymin', 'jquerydataTables', 'datatables', 'custom', 'dlabnav').then(data => {
    }).catch(error => console.log(error));
  }
  logout(){
    this.loginService.logout();
  }
}
