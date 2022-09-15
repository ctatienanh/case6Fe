import { Component, OnInit } from '@angular/core';
import {ScriptService} from "../../service/script.service";
import {LoginserviceService} from "../../service/loginservice.service";
import {AppUser} from "../../model/AppUser";
import {Notification} from "../../model/Notification";
import {ProfileService} from "../../service/profile.service";
import {NotificationserviceService} from "../../service/notificationservice.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MctChitietService} from "../../service/mct-chitiet.service";
import {Wallet} from "../../model/wallet";
import {WalletService} from "../../service/wallet.service";
import {Count} from "../../model/count";
import {Spending} from "../../model/spending";
import {SpendingService} from "../../service/spending.service";
import {AdduserService} from "../../service/adduser.service";
import * as moment from 'moment';
import {SpendinglimitService} from "../../service/spendinglimit.service";

@Component({
  selector: 'app-homeph',
  templateUrl: './homeph.component.html',
  styleUrls: ['./homeph.component.css']
})
export class HomephComponent implements OnInit {
  userph: AppUser = new AppUser(0, "", "", "", "", "", "", 0, 0, "")
  iduser: number = 0;
  notifications: Notification[] = [];
  wallets: Wallet = new Wallet(0, 0);
  count: Count =new Count(0);
  spendinggoal: Spending[] = [];
  usersv: AppUser = new AppUser(0, "", "", "", "", "", "", 0, 0, "");



  constructor(private notifi: NotificationserviceService,
              private profileservice: ProfileService  ,
              private script: ScriptService,
              private loginService: LoginserviceService,
              private mctChitietService: MctChitietService,
              private wallet: WalletService,
              private spendingService: SpendingService,
              private adduserservice: AdduserService,
              private  spendinglimitService:SpendinglimitService) { }

  ngOnInit(): void {
    this.script.load('global', 'Chartbundle', 'jquerymin', 'apexchart', 'nouislider', 'wNumb', 'dashboard-1', 'custom', 'dlabnav').then(data => {
    }).catch(error => console.log(error));
    this.shownotifi();
    this.showUser1();
    this.showWallet();
    this.showcount();
    this.showspending();
    this.showusersv();
  }

  logout(){
    this.loginService.logout();
  }
  showUser1() {
    let id = this.loginService.getUserToken().id
    this.profileservice.show(id).subscribe((data) => {
      console.log(data)
      this.userph = data;
    })
  }
  shownotifi(){
    this.notifi.show(this.adduserservice.getUser().id).subscribe((data) => {
      this.notifications = data;
      console.log(this.notifications)
    })
  }
  mctchitietfrom = new FormGroup({
    name: new FormControl('', Validators.required),
    namespending: new FormControl(""),
    money: new FormControl(),

  })

  createmctChitiet() {
    let mtct = {
      name: this.mctchitietfrom.value.name,
      namespending: this.mctchitietfrom.value.namespending,
      money: this.mctchitietfrom.value.money,
      user: {
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
      this.showWallet();
      this.showcount();
    });
  }

  showWallet() {
    this.wallet.show(this.adduserservice.getUser().id).subscribe((data) => {
      this.wallets = data;
      this.iduser = data.user.id;
    })
  }

  deduction() {
    let wallet = {
      id: this.wallets.id,
      money: (this.wallets.money - this.mctchitietfrom.value.money),
      user: {
        id: this.iduser
      }
    }
    this.wallet.create(wallet).subscribe((data) => {

    })

  }

  showcount() {
    this.wallet.show(this.adduserservice.getUser().id).subscribe((data) => {
      this.mctChitietService.showcount(data.user.id).subscribe((data) => {
        this.count = data;
        this.showWallet();
        console.log(data)
      });
    })
  }

  showspending() {
    this.spendingService.show(this.adduserservice.getUser().id).subscribe((data) => {
      this.spendinggoal = data;
      console.log(this.spendinggoal)
    })
  }
  showusersv(){
    this.usersv = this.adduserservice.getUser();
  }


  formhanche = new FormGroup({
    date2: new FormControl()
  })

  addhanche(){
    if (this.formhanche.value.date2 == 1){
      alert( moment().add(1, 'months').format(' YYYY/M/D'))

      let spen = {
        date2: moment().add(1, 'months').format(' YYYY/M/D')
      }
      console.log(spen)
      this.spendinglimitService.save(spen).subscribe((data) => {
        console.log("THanh cong")
      })

    }
    if (this.formhanche.value.date2 == 2){
      alert(  moment().add(7, 'days').format(' YYYY/M/D'))
    }

    if (this.formhanche.value.date2 == 3){
      alert(  moment().add(1, 'days').format(' YYYY/M/D'))
    }

  }



  }


