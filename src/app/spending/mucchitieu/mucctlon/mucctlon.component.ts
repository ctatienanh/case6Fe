import {Component, OnChanges, OnInit} from '@angular/core';
import {ScriptService} from "../../../service/script.service";
import {LoginserviceService} from "../../../service/loginservice.service";
import {FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {SpendingService} from "../../../service/spending.service";
import {Spending} from "../../../model/spending";
import {Router} from "@angular/router";
import {AppUser} from "../../../model/AppUser";
import {WalletService} from "../../../service/wallet.service";
import {ProfileService} from "../../../service/profile.service";
import {Wallet} from "../../../model/wallet";
import {NotificationserviceService} from "../../../service/notificationservice.service";
import {Notification} from "../../../model/Notification";
import {MctChitietService} from "../../../service/mct-chitiet.service";
import {AdduserService} from "../../../service/adduser.service";
import {Detail} from "../../../model/Detail";
import {lichsugiaodich} from "../../../model/lichsugiaodich";




@Component({
  selector: 'app-mucctlon',
  templateUrl: './mucctlon.component.html',
  styleUrls: ['./mucctlon.component.css']
})
export class MucctlonComponent implements OnInit, OnChanges {
  spendinggoal: Spending[] = [];
  showspendingg: Spending = new Spending(0, "", 0);
  user: AppUser = new AppUser(0, "", "", "", "", "", "", 0, 0, "")
  userph: AppUser = new AppUser(0, "", "", "", "", "", "", 0, 0, "")
  notifications: Notification[] = [];
  iduser: number = 0;
  Transaction2 : lichsugiaodich[] = [];
  Transaction3 : lichsugiaodich[] = [];
  constructor(private script: ScriptService, private loginService: LoginserviceService,
              private wallet: WalletService, private spendingService: SpendingService,
              private mctChitietService: MctChitietService,
              private profileservice: ProfileService, private notifi: NotificationserviceService,
              private adduserservice: AdduserService) {
  }

  wallets: Wallet = new Wallet(0, 0);

  ngOnInit(): void {
    this.script.load('global', 'Chartbundle', 'jquerymin', 'jquerydataTables', 'datatables', 'custom', 'dlabnav').then(data => {
    }).catch(error => console.log(error));
    this.showspending();
    this.showWallet();
    this.showUser1()
    this.shownotifi();
  }

  ngOnChanges(): void {
  }


  logout() {
    this.loginService.logout();
  }

  Formspen = new FormGroup({
    name: new FormControl('', Validators.required),
    iduser: new FormControl(this.loginService.getUserToken().id)
  })

  FormspenEdit = new FormGroup({
    id: new FormControl(),
    name: new FormControl('', Validators.required)
  })

  creatspending() {
    let spen = {
      name: this.Formspen.value.name,
      idUser: this.Formspen.value.iduser
    }

    if (this.Formspen.valid) {

      this.spendingService.checkname(spen).subscribe((data) => {
        if (data != null) {
          // @ts-ignore
          document.getElementById("checknamemct").style.display = "block"
        } else {
          this.checkname()
        }
      })
    } else {
      // @ts-ignore
      document.getElementById("createmct").style.display = "block"
    }
  }

  checkname() {
    let spen = {
      name: this.Formspen.value.name,
      user: {
        id: this.Formspen.value.iduser
      }
    }
    this.spendingService.create(spen).subscribe((data) => {
      this.Formspen = new FormGroup({
        name: new FormControl('', Validators.required),
        iduser: new FormControl(this.loginService.getUserToken().id)
      })
      this.showspending()
    })
  }


  showspending() {
    this.spendingService.show(this.loginService.getUserToken().id).subscribe((data) => {
      this.spendinggoal = data;
      console.log(this.spendinggoal)

    })
  }

  showdetail(name:string) {
    let detail = {
     id: this.loginService.getUserToken().id,
     namespending: name
   }
    this.mctChitietService.showdetail(detail).subscribe((data) => {
      this.Transaction3 = data;
      console.log(data)
    })
  }

  showedit(id: Number) {
    this.spendingService.showedit(id).subscribe((data) => {
      this.FormspenEdit = new FormGroup({
        id: new FormControl(id),
        name: new FormControl(data.name, Validators.required)
      })
      console.log(this.FormspenEdit.value)
    })
  }


  checkedit() {
    let spen = {
      name: this.FormspenEdit.value.name,
      idUser: this.Formspen.value.iduser
    }

    if (this.FormspenEdit.valid) {

      this.spendingService.checkname(spen).subscribe((data) => {
        if (data != null) {
          // @ts-ignore
          document.getElementById("checkeditmct").style.display = "block"
        } else {
          this.editspending()
        }
      })
    } else {
      // @ts-ignore
      document.getElementById("editmct").style.display = "block"
    }
  }

  editspending() {
    let spen = {
      id: this.FormspenEdit.value.id,
      name: this.FormspenEdit.value.name,
      user: {
        id: this.Formspen.value.iduser
      }
    }
    this.spendingService.create(spen).subscribe((data) => {
      this.showspending();

    })
  }

  showWallet() {
    this.wallet.show(this.loginService.getUserToken().id).subscribe((data) => {
      this.wallets = data;
    })
  }

  deletespending(spending: Spending) {
    this.spendingService.delete(spending).subscribe((data) => {
      this.showspending()
    })
  }

  showUser1() {
    let id = this.loginService.getUserToken().id
    this.profileservice.show(id).subscribe((data) => {
      console.log(data)
      this.user = data;
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



}
