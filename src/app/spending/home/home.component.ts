import { Component, OnInit } from '@angular/core';
import {ScriptService} from "../../service/script.service";
import {LoginserviceService} from "../../service/loginservice.service";
import {WalletService} from "../../service/wallet.service";
import {Wallet} from "../../model/wallet";
import {ProfileComponent} from "../profile/profile.component";
import {AppUser} from "../../model/AppUser";
import {ProfileService} from "../../service/profile.service";
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
  user: AppUser = new AppUser(0,"","","","","","",0,0,"")
  spendinggoal: Spending[] = [];
  iduser: number =0;


  constructor(private script: ScriptService, private loginService: LoginserviceService, private wallet: WalletService,private spendingService: SpendingService, private  mctChitietService: MctChitietService, private profileservice:ProfileService) { }
  wallets: Wallet = new Wallet(0,0);


  ngOnInit(): void {
    this.script.load('global','Chartbundle','jquerymin','apexchart','nouislider','wNumb','dashboard-1','custom','dlabnav').then(data => {
    }).catch(error => console.log(error));
    this.showWallet();
    this.showspending();
    this.showUser1()
  }

  showWallet(){
    this.wallet.show(this.loginService.getUserToken().id).subscribe((data) => {
      this.wallets = data;
      this.iduser = data.user.id;

    })
  }

  logout(){
    this.loginService.logout();
  }

  showUser1() {
    let id = this.loginService.getUserToken().id
    this.profileservice.show(id).subscribe((data) => {
      console.log(data)
      this.user = data;
    })
  }

  showspending(){
    this.spendingService.show(this.loginService.getUserToken().id).subscribe((data) => {
      this.spendinggoal = data;
      console.log(this.spendinggoal)
    })
  }

  mctchitietfrom = new FormGroup({
    name: new FormControl('', Validators.required),
    namespending: new FormControl(""),
    money: new FormControl(),

  })
  deduction(){
    let wallet = {
      id: this.wallets.id,
      money:  (this.wallets.money - this.mctchitietfrom.value.money),
      user:{
        id: this.iduser
      }
    }
    this.wallet.create(wallet).subscribe((data) => {

    })

  }

  createmctChitiet(){
    let mtct = {
      name: this.mctchitietfrom.value.name,
      namespending: this.mctchitietfrom.value.namespending,
      money: this.mctchitietfrom.value.money,
      user:{
        id: this.iduser
      }
    }

    this.mctChitietService.create(mtct).subscribe((data) => {
      this.deduction();
      this.mctchitietfrom = new FormGroup({
        name: new FormControl('', Validators.required),
        namespending: new FormControl(""),
        money: new FormControl(null, Validators.required),
      })
    });
  }

}









