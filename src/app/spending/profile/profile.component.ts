import {Component, OnInit} from '@angular/core';
import {ScriptService} from "../../service/script.service";
import {ProfileService} from "../../service/profile.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AppUser} from "../../model/AppUser";
import {LoginserviceService} from "../../service/loginservice.service";
import {finalize, Observable} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {FormControl, FormGroup} from "@angular/forms";
import {NotificationserviceService} from "../../service/notificationservice.service";
import {AdduserService} from "../../service/adduser.service";
import {Notification} from "../../model/Notification";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: AppUser = new AppUser(0, "", "", "", "", "", "", 0, 0, "")
  title = "cloudsSorage";
  fb: string = "";
  downloadURL: Observable<string> | undefined;
  urlImg : string = ""  ;
  notifications: Notification[] = [];

  userph: AppUser = new AppUser(0, "", "", "", "", "", "", 0, 0, "")


  constructor(private script: ScriptService, private profileservice: ProfileService,
              private router: Router, private route: ActivatedRoute,
              private loginService: LoginserviceService,
              private storage: AngularFireStorage,  private notifi: NotificationserviceService,
              private adduserservice: AdduserService) {
  }

  ngOnInit(): void {
    this.script.load('global', 'bootstrap-select', 'jquerymin', 'Chartbundle', 'lightgallery-all', 'custom', 'dlabnav', 'upimg').then(data => {
    }).catch(error => console.log(error));
    this.showUser()
    this.showUser1()
    this.shownotifi();
  }

  logout() {
    this.loginService.logout();
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
