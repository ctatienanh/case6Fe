import { Component, OnInit } from '@angular/core';
import {LoginserviceService} from "../../service/loginservice.service";

@Component({
  selector: 'app-err',
  templateUrl: './err.component.html',
  styleUrls: ['./err.component.css']
})
export class ErrComponent implements OnInit {

  constructor(private loginService: LoginserviceService) { }

  ngOnInit(): void {
  }
  back(){
    this.loginService.checkrole()
  }

}
