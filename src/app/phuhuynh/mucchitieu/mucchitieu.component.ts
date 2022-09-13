import { Component, OnInit } from '@angular/core';
import {ScriptService} from "../../service/script.service";
import {LoginserviceService} from "../../service/loginservice.service";

@Component({
  selector: 'app-mucchitieu',
  templateUrl: './mucchitieu.component.html',
  styleUrls: ['./mucchitieu.component.css']
})
export class MucchitieuComponent implements OnInit {

  constructor(private script: ScriptService, private loginService: LoginserviceService) { }

  ngOnInit(): void {

    this.script.load('global', 'Chartbundle', 'jquerymin', 'jquerydataTables', 'datatables', 'custom', 'dlabnav').then(data => {
    }).catch(error => console.log(error));
  }

  logout(){
    this.loginService.logout();
  }

}
