import { Component, OnInit } from '@angular/core';
import {ScriptService} from "../../service/script.service";
import {LoginserviceService} from "../../service/loginservice.service";
import {AppUser} from "../../model/AppUser";
import {finalize, Observable} from "rxjs";
import {ProfileService} from "../../service/profile.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {FormControl, FormGroup} from "@angular/forms";
import {Counttb} from "../../model/counttb";
import {Notification} from "../../model/Notification";
import {NotificationserviceService} from "../../service/notificationservice.service";
import {Wallet} from "../../model/wallet";
import {WalletService} from "../../service/wallet.service";
import {MctChitietService} from "../../service/mct-chitiet.service";
import {AdduserService} from "../../service/adduser.service";
import {lichsugiaodich} from "../../model/lichsugiaodich";

@Component({
  selector: 'app-profileph',
  templateUrl: './profileph.component.html',
  styleUrls: ['./profileph.component.css']
})
export class ProfilephComponent implements OnInit {
  user: AppUser = new AppUser(0, "", "", "", "", "", "", 0, 0, "")
  title = "cloudsSorage";
  fb: string = "";
  downloadURL: Observable<string> | undefined;
  urlImg : string = ""  ;
  counttb: Counttb = new Counttb(0);
  notifications: Notification[] = [];
  userph: AppUser = new AppUser(0, "", "", "", "", "", "", 0, 0, "")
  moneysv: string = ""
  addmoneymax: number = 0;
  conten: string = "";
  wallets: Wallet = new Wallet(0, 0);
  iduser: number = 0;
  Transaction: lichsugiaodich [] = [];


  constructor(private script: ScriptService,
              private profileservice: ProfileService, private router: Router,
              private route: ActivatedRoute, private loginService: LoginserviceService,
              private storage: AngularFireStorage,private notifi: NotificationserviceService,
              private wallet: WalletService,private mctChitietService: MctChitietService,
              private adduserservice: AdduserService,private notifiservice: NotificationserviceService) {
  }
  ngOnInit(): void {

    this.script.load('global', 'bootstrap-select', 'jquerymin', 'Chartbundle', 'lightgallery-all', 'custom', 'dlabnav', 'upimg').then(data => {
    }).catch(error => console.log(error));
    this.showUser();
    this.shownotifi();

  }

  logout(){
    this.loginService.logout();
  }


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
  shownotifi() {
    this.notifi.show(this.loginService.getUserToken().id).subscribe((data) => {
      this.notifications = data;
      console.log(this.notifications)
    })
  }
  showcounttb() {
    this.notifi.showcounttb(this.loginService.getUserToken().id).subscribe((data) => {
      this.counttb.Sumnotification = data.sumnotification;
    });
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
  showWallet() {
    this.wallet.show(this.adduserservice.getUser().id).subscribe((data) => {
      this.wallets = data;
      this.iduser = data.user.id;
    })
  }
  showTransaction() {
    this.mctChitietService.show(this.adduserservice.getUser().id).subscribe((data) => {
      this.Transaction = data;
      console.log(this.Transaction)
    })
  }

  showUser() {
    let id = this.loginService.getUserToken().id
    this.profileservice.show(id).subscribe((data) => {
      console.log(data)
      this.user = data;
    })
  }
  onFileSelected(event: Event) {
    var n = Date.now();
    // @ts-ignore
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
            }
            console.log(this.fb);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log("hmmmm")
          console.log(url);
        }
      });
  }

  edidForm = new FormGroup({
    id: new FormControl(0),
    username : new FormControl(""),
    password : new FormControl(""),
    roles : new FormControl(""),
    email : new FormControl(""),
    name: new FormControl(),
    aress: new FormControl(),
    phone : new FormControl(),
    age : new FormControl(),
    img : new FormControl("")

  })

  editProfile(){
    let form = this.edidForm.value;
    let edit= {
      id: this.user.id,
      username: this.user.username,
      password: this.user.password,
      roles: this.user.roles,
      email: this.user.email,
      name : form.name,
      aress: form.aress,
      phone: form.phone,
      age: form.age,
      img: this.fb
    }

    console.log(edit)
    this.profileservice.create(edit).subscribe((data)=>{
      this.showUser()
    })

  }



}
