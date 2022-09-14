import { Component, OnInit } from '@angular/core';
import {ScriptService} from "../../service/script.service";
import {LoginserviceService} from "../../service/loginservice.service";
import {AppUser} from "../../model/AppUser";
import {Notification} from "../../model/Notification";
import {ProfileService} from "../../service/profile.service";
import {NotificationserviceService} from "../../service/notificationservice.service";

@Component({
  selector: 'app-homeph',
  templateUrl: './homeph.component.html',
  styleUrls: ['./homeph.component.css']
})
export class HomephComponent implements OnInit {
  userph: AppUser = new AppUser(0, "", "", "", "", "", "", 0, 0, "")
  iduser: number = 0;
  notifications: Notification[] = [];

  constructor(private notifi: NotificationserviceService,private profileservice: ProfileService  ,private script: ScriptService, private loginService: LoginserviceService) { }

  ngOnInit(): void {
    this.script.load('global', 'Chartbundle', 'jquerymin', 'apexchart', 'nouislider', 'wNumb', 'dashboard-1', 'custom', 'dlabnav').then(data => {
    }).catch(error => console.log(error));
    this.shownotifi();
    this.showUser1();

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
    this.notifi.show(this.loginService.getUserToken().id).subscribe((data) => {
      this.notifications = data;
      console.log(this.notifications)
    })
  }
  }


