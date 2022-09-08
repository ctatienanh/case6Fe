import { Component, OnInit } from '@angular/core';
import {ScriptService} from "../../service/script.service";
import {LoginserviceService} from "../../service/loginservice.service";
import {WalletService} from "../../service/wallet.service";
import {Wallet} from "../../model/wallet";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private script: ScriptService, private loginService: LoginserviceService, private wallet: WalletService) { }
  wallets: Wallet = new Wallet(0,0);
  ngOnInit(): void {
    this.script.load('global','Chartbundle','jquerymin','apexchart','nouislider','wNumb','dashboard-1','custom','dlabnav').then(data => {
    }).catch(error => console.log(error));
    this.showWallet();
  }

  showWallet(){
    this.wallet.show(this.loginService.getUserToken().id).subscribe((data) => {
      this.wallets = data;
    })
  }

  logout(){
    this.loginService.logout();
  }


}
