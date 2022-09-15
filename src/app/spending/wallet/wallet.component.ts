import {Component, OnInit} from '@angular/core';
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
import {SpendingService} from "../../service/spending.service";
import {AdduserService} from "../../service/adduser.service";
import {DatePipe} from "@angular/common";


@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  Transaction: lichsugiaodich [] = [];
  Transaction1: lichsugiaodich [] = [];
  notifications: Notification[] = [];
  pipe = new DatePipe('en-US');
  userph: AppUser = new AppUser(0, "", "", "", "", "", "", 0, 0, "")
  user: AppUser = new AppUser(0, "", "", "", "", "", "", 0, 0, "")
  // spendingday:SpendingDay = new SpendingDay(0,null,null)
  iduser: number = 0;


  constructor(private script: ScriptService, private loginService: LoginserviceService,
              private wallet: WalletService, private spendingService: SpendingService,
              private mctChitietService: MctChitietService,
              private profileservice: ProfileService, private notifi: NotificationserviceService,
              private adduserservice: AdduserService) {
  }

  wallets: Wallet = new Wallet(0, 0);


  ngOnInit(): void {
    this.script.load('global', 'Chartbundle', 'jquerymin', 'apexchart', 'nouislider', 'wNumb', 'my-wallet', 'custom', 'dlabnav').then(data => {
    }).catch(error => console.log(error));
    this.showWallet();
    this.showUser1();
    this.shownotifi();

  }


  showWallet() {
    this.wallet.show(this.loginService.getUserToken().id).subscribe((data) => {
      this.wallets = data;
      this.iduser = data.user.id;


    })
    this.showTransaction();
  }

  logout() {
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

  recharge() {

    let wallet = {
      id: this.wallets.id,
      money: (this.Formwallet.value.money + this.wallets.money),
      user: {
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

  showTransaction() {
    this.mctChitietService.show(this.loginService.getUserToken().id).subscribe((data) => {
      this.Transaction = data;
      console.log(this.Transaction)
    })
  }

  shownotifi() {
    this.notifi.show(this.loginService.getUserToken().id).subscribe((data) => {
      this.notifications = data;
      console.log(this.notifications)
    })
  }

  shownameph(appuser: AppUser) {
    this.userph = appuser;
    console.log(this.userph)
  }

  adduserphvaosv() {
    let user = {
      id: this.user.id,
      username: this.user.username,
      password: this.user.password,
      email: this.user.email,
      roles: this.loginService.getUserToken().roles,
      name: this.user.name,
      aress: this.user.aress,
      phone: this.user.phone,
      age: this.user.age,
      img: this.user.img,
      user_ph: {
        id: this.userph.id,
      }
    }
    this.loginService.register(user).subscribe((data) => {
      // @ts-ignore
      document.getElementById("thongbao").innerHTML = "liên kết thành công";
      this.showUser1()
    })
  }

  adduser() {
    let user = {
      user_ph: {
        id: this.userph.id,
      },
      user_sv: {
        id: this.loginService.getUserToken().id,
      }
    }
    this.adduserservice.AddUser(user).subscribe((data) => {
      this.showUser1()
      this.adduserphvaosv()

    })
  }

  chekuserph() {
    if (this.user.user_ph == null) {
      this.adduser()
    } else {
      // @ts-ignore
      document.getElementById("thongbao").innerHTML = "Tài khoản đã được liên kết";
    }
  }

  fromday = new FormGroup({
    day1: new FormControl(),
    day2: new FormControl(),
  })

  seachDay() {
    let spendingday = {
      idUser: this.loginService.getUserToken().id,
      // day1: this.pipe.transform(this.fromday.value.day1,'yyyy/MM/dd'),
      // day2: this.pipe.transform(this.fromday.value.day2,'yyyy/MM/dd')
      day1: this.fromday.value.day1,
      day2: this.fromday.value.day2
    }
    let datecheck1 = new Date(spendingday.day1)
    let datecheck2 = new Date(spendingday.day2)
    if (datecheck1 <= datecheck2) {
      this.spendingService.seachDay(spendingday).subscribe((data) => {
        this.Transaction1 = data
        console.log(this.Transaction1)
        console.log("day")
      })
    }else {
      // @ts-ignore
      document.getElementById("checkdate").style.display = "flex"
    }
  }
}
