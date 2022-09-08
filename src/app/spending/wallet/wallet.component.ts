import { Component, OnInit } from '@angular/core';
import {ScriptService} from "../../service/script.service";

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  constructor(private script: ScriptService) { }

  ngOnInit(): void {
    this.script.load('global','Chartbundle','jquerymin','apexchart','nouislider','wNumb','my-wallet','custom','dlabnav').then(data => {
    }).catch(error => console.log(error));
  }

}
