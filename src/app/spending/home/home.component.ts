import {Component, OnInit} from '@angular/core';
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
import {Count} from "../../model/count";
import {NotificationserviceService} from "../../service/notificationservice.service";
import {Notification} from "../../model/Notification";
import {AdduserService} from "../../service/adduser.service";
import {Counttb} from "../../model/counttb";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  notifications: Notification[] = [];

  user: AppUser = new AppUser(0, "", "", "", "", "", "", 0, 0, "")
  spendinggoal: Spending[] = [];
  iduser: number = 0;
  count: Count = new Count(0);
  counttb: Counttb = new Counttb(0);

  userph: AppUser = new AppUser(0, "", "", "", "", "", "", 0, 0, "")


  constructor(private script: ScriptService, private loginService: LoginserviceService,
              private wallet: WalletService,
              private spendingService: SpendingService,
              private mctChitietService: MctChitietService,
              private profileservice: ProfileService, private notifi: NotificationserviceService,
              private adduserservice: AdduserService) {
  }

  wallets: Wallet = new Wallet(0, 0);


  ngOnInit(): void {
    this.script.load('global', 'Chartbundle', 'jquerymin', 'apexchart', 'nouislider', 'wNumb', 'dashboard-1', 'custom', 'dlabnav').then(data => {
    }).catch(error => console.log(error));
    this.showWallet();
    this.showspending();
    this.showUser1();
    this.showcount();
    this.shownotifi();
    this.showcounttb();
  }

  showWallet() {
    this.wallet.show(this.loginService.getUserToken().id).subscribe((data) => {
      this.wallets = data;
      this.iduser = data.user.id;
    })
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

  showspending() {
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

  showcount() {
    this.wallet.show(this.loginService.getUserToken().id).subscribe((data) => {
      this.mctChitietService.showcount(data.user.id).subscribe((data) => {
        this.count = data;
        this.showWallet();
        console.log(data)
      });
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

  showcounttb() {
      this.notifi.showcounttb(this.loginService.getUserToken().id).subscribe((data) => {
        this.counttb.Sumnotification = data.sumnotification;
      });
  }

}











