import { Component, OnInit } from '@angular/core';
import {ScriptService} from "../../service/script.service";
import {LoginserviceService} from "../../service/loginservice.service";
import {WalletService} from "../../service/wallet.service";
import {Wallet} from "../../model/wallet";
import {SpendingService} from "../../service/spending.service";
import {Spending} from "../../model/spending";
import {MctChitietService} from "../../service/mct-chitiet.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  spendinggoal: Spending[] = [];


  constructor(private script: ScriptService, private loginService: LoginserviceService, private wallet: WalletService,private spendingService: SpendingService, private  mctChitietService: MctChitietService) { }
  wallets: Wallet = new Wallet(0,0);
  ngOnInit(): void {
    this.script.load('global','Chartbundle','jquerymin','apexchart','nouislider','wNumb','dashboard-1','custom','dlabnav').then(data => {
    }).catch(error => console.log(error));
    this.showWallet();
    this.showspending()

  }

  showWallet(){
    this.wallet.show(this.loginService.getUserToken().id).subscribe((data) => {
      this.wallets = data;
    })
  }

  logout(){
    this.loginService.logout();
  }

  showspending() {
    this.spendingService.show(this.loginService.getUserToken().id).subscribe((data) => {
      this.spendinggoal = data;
      console.log(this.spendinggoal)
    })
  }

  mctchitietfrom = new FormGroup({
    name: new FormControl('', Validators.required),
    namespending: new FormControl(""),
    money: new FormControl(null, Validators.required),
  })

  createmctChitiet(){
    this.mctChitietService.create(this.mctchitietfrom.value).subscribe((data) => {

     this.mctchitietfrom = new FormGroup({
        name: new FormControl('', Validators.required),
        namespending: new FormControl(""),
        money: new FormControl(null, Validators.required),
      })
    })
  }








}
