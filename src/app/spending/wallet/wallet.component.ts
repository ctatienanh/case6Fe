import { Component, OnInit } from '@angular/core';
import {ScriptService} from "../../service/script.service";
import {AppUser} from "../../model/AppUser";
import {LoginserviceService} from "../../service/loginservice.service";
import {WalletService} from "../../service/wallet.service";
import {ProfileService} from "../../service/profile.service";
import {Wallet} from "../../model/wallet";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {lichsugiaodich} from "../../model/lichsugiaodich";
import {MctChitietService} from "../../service/mct-chitiet.service";
import {Notification} from "../../model/Notification";
import {NotificationserviceService} from "../../service/notificationservice.service";

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  Transaction:lichsugiaodich []=[];
  notifications: Notification[] = [];
  userph: AppUser = new AppUser(0, "", "", "", "", "", "", 0, 0, "")

  user: AppUser = new AppUser(0,"","","","","","",0,0,"")
  iduser: number =0;
  constructor(private notifi: NotificationserviceService,private script: ScriptService, private loginService: LoginserviceService, private wallet: WalletService, private profileservice:ProfileService,private mctChitietService:MctChitietService) { }
  wallets: Wallet = new Wallet(0,0);


  ngOnInit(): void {
    this.script.load('global','Chartbundle','jquerymin','apexchart','nouislider','wNumb','my-wallet','custom','dlabnav').then(data => {
    }).catch(error => console.log(error));
    this.showWallet();
    this.showUser1();
    this.shownotifi();

  }


  showWallet(){
    this.wallet.show(this.loginService.getUserToken().id).subscribe((data) => {
      this.wallets = data;
      this.iduser = data.user.id;
      console.log("aaa")
      console.log(data)

    })
    this.showTransaction();
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
  Formwallet = new FormGroup({
    money: new FormControl()
  })
  recharge(){

    let wallet = {
      id: this.wallets.id,
      money:  (this.Formwallet.value.money + this.wallets.money),
      user:{
        id: this.iduser
      }
    }
    this.wallet.create(wallet).subscribe((data) => {
      this.showWallet();
      this.Formwallet = new FormGroup({
        money: new FormControl()
      })

    })
  }
  showTransaction(){
    this.mctChitietService.show(this.loginService.getUserToken().id).subscribe((data) => {
      this.Transaction = data;
      console.log(this.Transaction)
    })
  }
  shownotifi(){
    this.notifi.show(this.loginService.getUserToken().id).subscribe((data) => {
      this.notifications = data;
      console.log(this.notifications)
    })
  }

  shownameph(appuser: AppUser){
    this.userph = appuser;
    console.log(this.userph)
  }
}
