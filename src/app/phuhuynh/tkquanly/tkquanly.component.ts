import {Component, OnInit} from '@angular/core';
import {ScriptService} from "../../service/script.service";
import {LoginserviceService} from "../../service/loginservice.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NotificationserviceService} from "../../service/notificationservice.service";
import {AppUser} from "../../model/AppUser";
import {ProfileService} from "../../service/profile.service";

@Component({
  selector: 'app-tkquanly',
  templateUrl: './tkquanly.component.html',
  styleUrls: ['./tkquanly.component.css']
})
export class TkquanlyComponent implements OnInit {
  usersv: AppUser = new AppUser(0, "", "", "", "", "", "", 0, 0, "")
  constructor(private script: ScriptService, private loginService: LoginserviceService, private notifiservice: NotificationserviceService,private profileservice:ProfileService) {
  }

  ngOnInit(): void {
    this.script.load('global', 'Chartbundle', 'jquerymin', 'jquerydataTables', 'datatables', 'custom', 'dlabnav').then(data => {
    }).catch(error => console.log(error));
    this.showUser1()

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
      user_sv : {
        id: this.usersv.id
      },
      user_ph:{
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
  showUser1() {
    let id = this.loginService.getUserToken().id
    this.profileservice.show(id).subscribe((data) => {
      console.log(data)
      this.usersv = data;
    })
  }

}
