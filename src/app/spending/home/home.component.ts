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
import {Spendinglimit} from "../../model/spendinglimit";
import {SpendinglimitService} from "../../service/spendinglimit.service";
import {DatePipe} from "@angular/common";

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
  pipe = new DatePipe('en-US');
  userph: AppUser = new AppUser(0, "", "", "", "", "", "", 0, 0, "")
  spendinglimit: Spendinglimit[] = [];
  date: any;
  moneyhc: number =0;

  constructor(private script: ScriptService, private loginService: LoginserviceService,
              private wallet: WalletService,
              private spendingService: SpendingService,
              private mctChitietService: MctChitietService,
              private profileservice: ProfileService, private notifi: NotificationserviceService,
              private adduserservice: AdduserService,private  spendinglimitService:SpendinglimitService,
              private notifiservice: NotificationserviceService) {
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
    this.showhanche();
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
    this.moneyhc = this.mctchitietfrom.value.money
    this.mctChitietService.create(mtct).subscribe((data) => {
      this.deduction();
      this.mctchitietfrom = new FormGroup({
        name: new FormControl('', Validators.required),
        namespending: new FormControl(""),
        money: new FormControl(null, Validators.required),
      })
      this.date = this.pipe.transform(new Date(),'yyyy-MM-dd');
      this.showWallet();
      this.showcount();
      this.themtienvaohanche();
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

  shownameph(appuser: AppUser,i : number) {
    this.userph = appuser;
   let notification = {
     id:this.notifications[i].id,
     content:this.notifications[i].content,
     date: this.notifications[i].date,
     time: this.notifications[i].time,
     status_confirm:this.notifications[i].status_confirm = true,
     user_ph:{
        id: this.userph.id,
     },
     user_sv: {
       id: this.loginService.getUserToken().id,
     }
   }
this.notifi.editstatus(notification).subscribe((data) => {
  console.log(data)
  this.shownotifi();
    this.showcounttb();
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

  showhanche(){
    this.spendinglimitService.show(this.loginService.getUserToken().id).subscribe((data) => {
      this.spendinglimit = data;
      console.log(this.spendinglimit)
    });
  }

  themtienvaohanche(){
    for (let s of this.spendinglimit){
      if ( s.date1 >= this.date ||this.date <= s.date2 ){
        s.money += this.moneyhc;
        let a= {
          id: s.id,
          date1: s.date1,
          date2:s.date2,
          user: {
            id: s.user.id
          },
          money: s.money,
          moneylimit: s.moneylimit
        }
        this.spendinglimitService.save(a).subscribe((data) => {
          this.showhanche()
        });
        this.ktguinotifi();
      }
    }
  }

  ktguinotifi() {

    for (let s of this.spendinglimit) {

      if (s.money > s.moneylimit) {
        let notifi = {
          user_sv: {
            id:  this.user.user_ph.id
          },
          user_ph: {
            id: this.loginService.getUserToken().id
          },
          content: "Hạn chi tiêu ngày "+s.date1 + " đến " + s.date2+" đã quá vượt quá hạn mức chi tiêu "
        }


        this.notifiservice.add(notifi).subscribe((data) => {
            alert("thanh công")
          }
        )
      }
    }
  }
}











