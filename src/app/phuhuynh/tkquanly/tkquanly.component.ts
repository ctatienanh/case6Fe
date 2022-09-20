import {Component, OnInit} from '@angular/core';
import {ScriptService} from "../../service/script.service";
import {LoginserviceService} from "../../service/loginservice.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NotificationserviceService} from "../../service/notificationservice.service";
import {AppUser} from "../../model/AppUser";
import {AdduserService} from "../../service/adduser.service";
import {AddUser} from "../../model/AddUser";
import {Wallet} from "../../model/wallet";
import {WalletService} from "../../service/wallet.service";
import {Counttb} from "../../model/counttb";
import {Notification} from "../../model/Notification";
import {lichsugiaodich} from "../../model/lichsugiaodich";
import {MctChitietService} from "../../service/mct-chitiet.service";

@Component({
  selector: 'app-tkquanly',
  templateUrl: './tkquanly.component.html',
  styleUrls: ['./tkquanly.component.css']
})
export class TkquanlyComponent implements OnInit {
  usersv: AppUser = new AppUser(0, "", "", "", "", "", "", 0, 0, "")
  users: AddUser[] = [];
  userchon: AppUser = new AppUser(0, "", "", "", "", "", "", 0, 0, "")
  wallets: Wallet = new Wallet(0, 0);
  check: number = 0;
  counttb: Counttb = new Counttb(0);
  notifications: Notification[] = [];
  userph: AppUser = new AppUser(0, "", "", "", "", "", "", 0, 0, "")
  moneysv: string = ""
  addmoneymax: number = 0;
  conten: string = "";
  iduser: number = 0;
  Transaction: lichsugiaodich [] = [];
  constructor(private script: ScriptService, private loginService: LoginserviceService,
              private notifiservice: NotificationserviceService,
              private adduserservice: AdduserService,
              private wallet: WalletService,private notifi: NotificationserviceService,
              private mctChitietService: MctChitietService) {
  }

  ngOnInit(): void {
    this.script.load('global', 'Chartbundle', 'jquerymin', 'jquerydataTables', 'datatables', 'custom', 'dlabnav').then(data => {

    }).catch(error => console.log(error));
    this.showadduser();
    this.checkusersv();
    this.showWallet();
    this.shownotifi();

  }

  logout() {
    this.loginService.logout();
  }

  formadduser = new FormGroup({
    username: new FormControl("", Validators.required)
  })
  shownameph(appuser: AppUser,i : number) {
    this.userph = appuser;
    let notification = {
      id:this.notifications[i].id,
      content:this.notifications[i].content,
      date: this.notifications[i].date,
      time: this.notifications[i].time,
      status_confirm:this.notifications[i].status_confirm = true,
      money : this.notifications[i].money,
      user_ph:{
        id: this.userph.id,
      },
      user_sv: {
        id: this.loginService.getUserToken().id,
      }
    }
    this.moneysv = this.notifications[i].user_ph.username;
    this.addmoneymax = this.notifications[i].money;
    this.conten = this.notifications[i].content
    this.notifi.editstatus(notification).subscribe((data) => {
      console.log(data)
      this.shownotifi();
      this.showcounttb();
    })
  }
  showcounttb() {
    this.notifi.showcounttb(this.loginService.getUserToken().id).subscribe((data) => {
      this.counttb.Sumnotification = data.sumnotification;
    });
  }
  shownotifi() {
    this.notifi.show(this.loginService.getUserToken().id).subscribe((data) => {
      this.notifications = data;
      console.log(this.notifications)
    })
  }
  checkuser() {
    this.loginService.checkuser(this.formadduser.value.username).subscribe((data) => {
        if (data != null) {
          // @ts-ignore
          document.getElementById("checkuser").style.display = "none"
          this.formadduser = new FormGroup({
            username: new FormControl("")
          })
          this.usersv = data;

          this.add();
        } else {
          // @ts-ignore
          document.getElementById("checkuser").style.display = "block"
        }
      }
    )
  }

  add() {
    let notifi = {
      user_sv: {
        id: this.usersv.id
      },
      user_ph: {
        id: this.loginService.getUserToken().id
      },
      content: "add"
    }

    console.log(notifi)

    this.notifiservice.add(notifi).subscribe((data) => {
        alert("đã gửi thông báo đến tài khoản để xác thực")
      }
    )
  }

  showadduser() {
    this.adduserservice.getallbyid(this.loginService.getUserToken().id).subscribe((data) => {
        this.users = data;
        console.log(this.users)
      }
    )
  }

  showusersv(user: string) {
    this.adduserservice.showuser(user).subscribe((data) => {
        this.adduserservice.setUser(data)
        this.showluachon();
        this.showWallet();
      }
    )
  }
  recharge() {
    let wallet = {
      id: this.wallets.id,
      money: (this.addmoneymax + this.wallets.money),
      user: {
        id: this.iduser
      }
    }
    this.wallet.create(wallet).subscribe((data) => {
      this.createmctChitiet()
    })
  }
  createmctChitiet() {
    let mtct = {
      name: "nạp tiền vào ví",
      namespending: "nạp tiền vào ví",
      money: this.addmoneymax,
      user: {
        id: this.iduser
      }
    }

    this.mctChitietService.create(mtct).subscribe((data) => {
      this.showWallet();
      this.showTransaction();
      let notifi = {
        user_sv: {
          id: this.adduserservice.getUser().id
        },
        user_ph: {
          id: this.loginService.getUserToken().id
        },
        content: "Phụ huynh đã đồng ý",
      }
      this.notifiservice.add(notifi).subscribe((data) => {
      })

    });
  }
  showTransaction() {
    this.mctChitietService.show(this.adduserservice.getUser().id).subscribe((data) => {
      this.Transaction = data;
      console.log(this.Transaction)
    })
  }

  showluachon() {
    this.userchon = this.adduserservice.getUser();
    this.check = 1;
  }


  showWallet() {
    this.wallet.show(this.adduserservice.getUser().id).subscribe((data) => {
      this.wallets = data;
    })
  }

  checkusersv() {
    if (this.adduserservice.getUser() != null) {
      this.showluachon()
    }
  }


}
