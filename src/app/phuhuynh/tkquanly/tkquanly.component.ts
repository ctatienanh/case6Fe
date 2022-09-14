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

  constructor(private script: ScriptService, private loginService: LoginserviceService,
              private notifiservice: NotificationserviceService,
              private adduserservice: AdduserService,
              private wallet: WalletService) {
  }

  ngOnInit(): void {
    this.script.load('global', 'Chartbundle', 'jquerymin', 'jquerydataTables', 'datatables', 'custom', 'dlabnav').then(data => {

    }).catch(error => console.log(error));
    this.showadduser();
    this.checkusersv();
    this.showWallet()
  }

  logout() {
    this.loginService.logout();
  }

  formadduser = new FormGroup({
    username: new FormControl("", Validators.required)
  })

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
