import {Component, OnInit} from '@angular/core';
import {ScriptService} from "../../service/script.service";
import {LoginserviceService} from "../../service/loginservice.service";
import {AppUser} from "../../model/AppUser";
import {Notification} from "../../model/Notification";
import {ProfileService} from "../../service/profile.service";
import {NotificationserviceService} from "../../service/notificationservice.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MctChitietService} from "../../service/mct-chitiet.service";
import {Wallet} from "../../model/wallet";
import {WalletService} from "../../service/wallet.service";
import {Count} from "../../model/count";
import {Spending} from "../../model/spending";
import {SpendingService} from "../../service/spending.service";
import {AdduserService} from "../../service/adduser.service";
import * as moment from 'moment';
import {SpendinglimitService} from "../../service/spendinglimit.service";
import {Spendinglimit} from "../../model/spendinglimit";
import {lichsugiaodich} from "../../model/lichsugiaodich";
import {AddUser} from "../../model/AddUser";
import {Counttb} from "../../model/counttb";

@Component({
  selector: 'app-homeph',
  templateUrl: './homeph.component.html',
  styleUrls: ['./homeph.component.css']
})
export class HomephComponent implements OnInit {
  userph: AppUser = new AppUser(0, "", "", "", "", "", "", 0, 0, "")
  iduser: number = 0;
  notifications: Notification[] = [];
  wallets: Wallet = new Wallet(0, 0);
  count: Count = new Count(0);
  spendinggoal: Spending[] = [];
  usersv: AppUser = new AppUser(0, "", "", "", "", "", "", 0, 0, "");
  spendinglimit: Spendinglimit[] = [];
  showspendinglimit: Spendinglimit[] = [];
  Transaction: lichsugiaodich [] = [];
  Transaction1: lichsugiaodich [] = [];
  datehientai: Date = new Date();
  conten: string = "";
  counttb: Counttb = new Counttb(0);
  addmoneymax: number = 0;
  moneysv: string = ""


  constructor(private notifi: NotificationserviceService,
              private profileservice: ProfileService,
              private script: ScriptService,
              private loginService: LoginserviceService,
              private mctChitietService: MctChitietService,
              private wallet: WalletService,
              private spendingService: SpendingService,
              private adduserservice: AdduserService,
              private spendinglimitService: SpendinglimitService,
              private notifiservice: NotificationserviceService) {
  }

  ngOnInit(): void {
    this.script.load('global', 'Chartbundle', 'jquerymin', 'apexchart', 'nouislider', 'wNumb', 'dashboard-1', 'custom', 'dlabnav').then(data => {
    }).catch(error => console.log(error));
    this.shownotifi();
    this.showUser1();
    this.showWallet();
    this.showcount();
    this.showspending();
    this.showusersv();
    this.showTransaction();
    this.showhanche()
  }

  logout() {
    this.loginService.logout();
  }

  showUser1() {
    let id = this.loginService.getUserToken().id
    this.profileservice.show(id).subscribe((data) => {
      console.log(data)
      this.userph = data;
    })
  }

  shownotifi() {
    this.notifi.show(this.loginService.getUserToken().id).subscribe((data) => {
      this.notifications = data;
      console.log(this.notifications)
    })
  }

  mctchitietfrom = new FormGroup({
    name: new FormControl('', Validators.required),
    namespending: new FormControl(""),
    money: new FormControl(),

  })



  showWallet() {
    this.wallet.show(this.adduserservice.getUser().id).subscribe((data) => {
      this.wallets = data;
      this.iduser = data.user.id;
    })
  }

  showcount() {
    this.wallet.show(this.adduserservice.getUser().id).subscribe((data) => {
      this.mctChitietService.showcount(data.user.id).subscribe((data) => {
        this.count = data;
        this.showWallet();
        console.log(data)
      });
    })
  }

  showspending() {
    this.spendingService.show(this.adduserservice.getUser().id).subscribe((data) => {
      this.spendinggoal = data;
      console.log(this.spendinggoal)
    })
  }

  showusersv() {
    this.usersv = this.adduserservice.getUser();
  }


  formhanche = new FormGroup({
    date2: new FormControl(),
    money: new FormControl()
  })

  addhanche(spen: any) {

    this.spendinglimitService.save(spen).subscribe((data) => {
      // @ts-ignore
      document.getElementById("tbhc").innerHTML = " Thêm giới hạn thành công "
      this.showhanche();
    })
  }

  showhanche(){
    this.spendinglimitService.show(this.adduserservice.getUser().id).subscribe((data) => {
      this.showspendinglimit = data;
      console.log(this.showspendinglimit)
      console.log(data)
    });
  }

  checkhanche() {
    let check = true;

    let spen = {
      date2: "",
      moneylimit: this.formhanche.value.money,
      user: {
        id: this.adduserservice.getUser().id,
      }
    }
    if (this.formhanche.value.date2 == 1) {

      spen.date2 = moment().add(1, 'months').format(' YYYY-MM-DD')
    }
    if (this.formhanche.value.date2 == 2) {
      spen.date2 = moment().add(7, 'days').format(' YYYY-MM-DD')

    }

    if (this.formhanche.value.date2 == 3) {
      spen.date2 = moment().add(1, 'days').format(' YYYY-MM-DD')
    }



    this.spendinglimitService.show(this.adduserservice.getUser().id).subscribe((data) => {
      this.spendinglimit = data;
      console.log(data)
      console.log(this.spendinglimit)
      for (let i = 0; i < this.spendinglimit.length; i++) {

        // @ts-ignore
        let date1 = new Date(spen.date2)
        let date3 = new Date(this.spendinglimit[i].date2)
        let date = new Date();
        if (date.getDate() < date3.getDate() || (date.getMonth() + 1) < (date3.getMonth() + 1)) {
          if ((date1.getMonth() + 1) == (date3.getMonth() + 1)) {
            if ((date1.getDate() + "-" + (date1.getMonth() + 1) + "-" + date1.getFullYear()) < (date3.getDate() + "-" + (date3.getMonth() + 1) + "-" + date3.getFullYear())) {
              alert("<")
              if (spen.moneylimit < this.spendinglimit[i].moneylimit) {
                this.spendinglimit.splice(i, 1);
                for (let j = 0; j < this.spendinglimit.length; j++) {
                  let date4 = new Date(this.spendinglimit[j].date2)
                  if (date.getDate() < date4.getDate() || (date.getMonth() + 1) < (date4.getMonth() + 1)) {
                    if ((date1.getMonth() + 1) == (date4.getMonth() + 1)) {
                      if ((date1.getDate() + "-" + (date1.getMonth() + 1) + "-" + date1.getFullYear()) < (date4.getDate() + "-" + (date4.getMonth() + 1) + "-" + date4.getFullYear())) {
                        if (spen.moneylimit < this.spendinglimit[j].moneylimit) {
                          this.spendinglimit.splice(j, 1);
                          for (let g = 0; g < this.spendinglimit.length; g++) {
                            let date5 = new Date(this.spendinglimit[g].date2)
                            if (date.getDate() < date5.getDate() || (date.getMonth() + 1) < (date5.getMonth() + 1)) {
                              if ((date1.getMonth() + 1) == (date5.getMonth() + 1)) {
                                if ((date1.getDate() + "-" + (date1.getMonth() + 1) + "-" + date1.getFullYear()) == (date5.getDate() + "-" + (date5.getMonth() + 1) + "-" + date5.getFullYear())) {
                                  // @ts-ignore
                                  document.getElementById("tbhc").innerHTML = "Hạn chế ở thời gian này đã tồn tại"
                                  check = false;
                                }
                              }
                              if ((date1.getMonth() + 1) > (date5.getMonth() + 1)) {
                                if (spen.moneylimit < this.spendinglimit[g].moneylimit) {
                                  // @ts-ignore
                                  document.getElementById("tbhc").innerHTML = " Vui lòng lựa chọn số tiền giới hạn lớn hơn "
                                  check = false;
                                }
                              }
                              if ((date1.getMonth() + 1) < (date5.getMonth() + 1)) {
                                if (spen.moneylimit > this.spendinglimit[g].moneylimit) {
                                  // @ts-ignore
                                  document.getElementById("tbhc").innerHTML = " Vui lòng lựa chọn số tiền giới hạn nho hơn "
                                  check = false;
                                }
                              }
                            }


                          }
                        } else {
                          // @ts-ignore
                          document.getElementById("tbhc").innerHTML = " Vui lòng lựa chọn số tiền giới hạn nhỏ hơn "
                          check = false;
                        }
                      }
                      if ((date1.getDate() + "-" + (date1.getMonth() + 1) + "-" + date1.getFullYear()) == (date4.getDate() + "-" + (date4.getMonth() + 1) + "-" + date4.getFullYear())) {
                        alert("=")
                        // @ts-ignore
                        document.getElementById("tbhc").innerHTML = "Hạn chế ở thời gian này đã tồn tại"
                        check = false;
                      }
                      if ((date1.getDate() + "-" + (date1.getMonth() + 1) + "-" + date1.getFullYear()) > (date4.getDate() + "-" + (date4.getMonth() + 1) + "-" + date4.getFullYear())) {
                        alert(">")
                        if (spen.moneylimit > this.spendinglimit[j].moneylimit) {
                          this.spendinglimit.splice(j, 1);
                          for (let g = 0; g < this.spendinglimit.length; g++) {
                            let date5 = new Date(this.spendinglimit[g].date2)
                            if (date.getDate() < date5.getDate() || (date.getMonth() + 1) < (date5.getMonth() + 1)) {
                              if ((date1.getMonth() + 1) == (date5.getMonth() + 1)) {
                                if ((date1.getDate() + "-" + (date1.getMonth() + 1) + "-" + date1.getFullYear()) == (date5.getDate() + "-" + (date5.getMonth() + 1) + "-" + date5.getFullYear())) {
                                  // @ts-ignore
                                  document.getElementById("tbhc").innerHTML = "Hạn chế ở thời gian này đã tồn tại"
                                  check = false;
                                }
                              }
                              if ((date1.getMonth() + 1) > (date5.getMonth() + 1)) {
                                if (spen.moneylimit < this.spendinglimit[g].moneylimit) {
                                  // @ts-ignore
                                  document.getElementById("tbhc").innerHTML = " Vui lòng lựa chọn số tiền giới hạn lớn hơn "
                                  check = false;
                                }
                              }
                              if ((date1.getMonth() + 1) < (date5.getMonth() + 1)) {
                                if (spen.moneylimit > this.spendinglimit[g].moneylimit) {
                                  // @ts-ignore
                                  document.getElementById("tbhc").innerHTML = " Vui lòng lựa chọn số tiền giới hạn nho hơn "
                                  check = false;
                                }
                              }
                            }


                          }
                        } else {
                          // @ts-ignore
                          document.getElementById("tbhc").innerHTML = " Vui lòng lựa chọn số tiền giới hạn lớn hơn "

                          check = false;
                        }
                      }
                    }
                    if ((date1.getMonth() + 1) > (date4.getMonth() + 1)) {
                      if (spen.moneylimit < this.spendinglimit[j].moneylimit) {
                        // @ts-ignore
                        document.getElementById("tbhc").innerHTML = " Vui lòng lựa chọn số tiền giới hạn lớn hơn "
                        check = false;
                      }
                    }


                  }
                }
              } else {
                // @ts-ignore
                document.getElementById("tbhc").innerHTML = " Vui lòng lựa chọn số tiền giới hạn nhỏ hơn "
                check = false;
              }
            }
            if ((date1.getDate() + "-" + (date1.getMonth() + 1) + "-" + date1.getFullYear()) == (date3.getDate() + "-" + (date3.getMonth() + 1) + "-" + date3.getFullYear())) {
              // @ts-ignore
              document.getElementById("tbhc").innerHTML = "Hạn chế ở thời gian này đã tồn tại"
              check = false;
            }
            if ((date1.getDate() + "-" + (date1.getMonth() + 1) + "-" + date1.getFullYear()) > (date3.getDate() + "-" + (date3.getMonth() + 1) + "-" + date3.getFullYear())) {
              if (spen.moneylimit > this.spendinglimit[i].moneylimit) {
                this.spendinglimit.splice(i, 1);
                for (let j = 0; j < this.spendinglimit.length; j++) {
                  let date4 = new Date(this.spendinglimit[j].date2)

                  if (date.getDate() < date4.getDate() || (date.getMonth() + 1) < (date4.getMonth() + 1)) {
                    if ((date1.getMonth() + 1) == (date4.getMonth() + 1)) {

                      if ((date1.getDate() + "-" + (date1.getMonth() + 1) + "-" + date1.getFullYear()) > (date4.getDate() + "-" + (date4.getMonth() + 1) + "-" + date4.getFullYear())) {
                        if (spen.moneylimit > this.spendinglimit[j].moneylimit) {
                          this.spendinglimit.splice(j, 1);
                          for (let g = 0; g < this.spendinglimit.length; g++) {
                            let date5 = new Date(this.spendinglimit[g].date2)
                            if (date.getDate() < date5.getDate() || (date.getMonth() + 1) < (date5.getMonth() + 1)) {
                              if ((date1.getMonth() + 1) == (date5.getMonth() + 1)) {
                                if ((date1.getDate() + "-" + (date1.getMonth() + 1) + "-" + date1.getFullYear()) == (date5.getDate() + "-" + (date5.getMonth() + 1) + "-" + date5.getFullYear())) {
                                  // @ts-ignore
                                  document.getElementById("tbhc").innerHTML = "Hạn chế ở thời gian này đã tồn tại"
                                  check = false;
                                }
                              }
                              if ((date1.getMonth() + 1) > (date5.getMonth() + 1)) {
                                if (spen.moneylimit < this.spendinglimit[g].moneylimit) {
                                  // @ts-ignore
                                  document.getElementById("tbhc").innerHTML = " Vui lòng lựa chọn số tiền giới hạn lớn hơn "
                                  check = false;
                                }
                              }
                              if ((date1.getMonth() + 1) < (date5.getMonth() + 1)) {
                                if (spen.moneylimit > this.spendinglimit[g].moneylimit) {
                                  // @ts-ignore
                                  document.getElementById("tbhc").innerHTML = " Vui lòng lựa chọn số tiền giới hạn nho hơn "
                                  check = false;
                                }
                              }
                            }


                          }
                        } else {
                          // @ts-ignore
                          document.getElementById("tbhc").innerHTML = " Vui lòng lựa chọn số tiền giới hạn lớn hơn "
                          check = false;
                          console.log("g")

                        }
                      }
                      if ((date1.getDate() + "-" + (date1.getMonth() + 1) + "-" + date1.getFullYear()) == (date4.getDate() + "-" + (date4.getMonth() + 1) + "-" + date4.getFullYear())) {
                        // @ts-ignore
                        document.getElementById("tbhc").innerHTML = "Hạn chế ở thời gian này đã tồn tại"
                        check = false;
                      }
                      if ((date1.getDate() + "-" + (date1.getMonth() + 1) + "-" + date1.getFullYear()) < (date4.getDate() + "-" + (date4.getMonth() + 1) + "-" + date4.getFullYear())) {
                        if (spen.moneylimit < this.spendinglimit[j].moneylimit) {
                          this.spendinglimit.splice(j, 1);
                          for (let g = 0; g < this.spendinglimit.length; g++) {
                            let date5 = new Date(this.spendinglimit[g].date2)
                            if (date.getDate() < date5.getDate() || (date.getMonth() + 1) < (date5.getMonth() + 1)) {
                              if ((date1.getMonth() + 1) == (date5.getMonth() + 1)) {
                                if ((date1.getDate() + "-" + (date1.getMonth() + 1) + "-" + date1.getFullYear()) == (date5.getDate() + "-" + (date5.getMonth() + 1) + "-" + date5.getFullYear())) {
                                  // @ts-ignore
                                  document.getElementById("tbhc").innerHTML = "Hạn chế ở thời gian này đã tồn tại"
                                  check = false;
                                }
                              }
                              if ((date1.getMonth() + 1) < (date5.getMonth() + 1)) {
                                if (spen.moneylimit > this.spendinglimit[g].moneylimit) {
                                  // @ts-ignore
                                  document.getElementById("tbhc").innerHTML = " Vui lòng lựa chọn số tiền giới hạn nho hơn "
                                  check = false;
                                }
                              }
                              if ((date1.getMonth() + 1) > (date5.getMonth() + 1)) {
                                if (spen.moneylimit < this.spendinglimit[g].moneylimit) {
                                  // @ts-ignore
                                  document.getElementById("tbhc").innerHTML = " Vui lòng lựa chọn số tiền giới hạn lớn hơn "
                                  check = false;
                                }
                              }
                            }


                          }
                        } else {
                          // @ts-ignore
                          document.getElementById("tbhc").innerHTML = " Vui lòng lựa chọn số tiền giới hạn nhỏ hơn "
                          check = false;
                        }
                      }

                    }
                    if ((date1.getMonth() + 1) > (date4.getMonth() + 1)) {
                      if (spen.moneylimit < this.spendinglimit[j].moneylimit) {
                        // @ts-ignore
                        document.getElementById("tbhc").innerHTML = " Vui lòng lựa chọn số tiền giới hạn lớn hơn "
                        check = false;
                      }
                    }
                    if ((date1.getMonth() + 1) < (date4.getMonth() + 1)) {
                      if (spen.moneylimit > this.spendinglimit[j].moneylimit) {
                        // @ts-ignore
                        document.getElementById("tbhc").innerHTML = " Vui lòng lựa chọn số tiền giới hạn nho hơn "
                        check = false;
                      }
                    }
                  }


                }
              } else {
                // @ts-ignore
                document.getElementById("tbhc").innerHTML = " Vui lòng lựa chọn số tiền giới hạn lớn hơn "
                check = false;
              }
            }
          }
          if ((date1.getMonth() + 1) > (date3.getMonth() + 1)) {
            if (spen.moneylimit < this.spendinglimit[i].moneylimit) {
              // @ts-ignore
              document.getElementById("tbhc").innerHTML = " Vui lòng lựa chọn số tiền giới hạn lớn hơn "
              check = false;
            }
          }
          if ((date1.getMonth() + 1) < (date3.getMonth() + 1)) {
            if (spen.moneylimit > this.spendinglimit[i].moneylimit) {
              // @ts-ignore
              document.getElementById("tbhc").innerHTML = " Vui lòng lựa chọn số tiền giới hạn nho hơn "
              check = false;
            }
          }

        }

      }
      if (check == true) {
        this.addhanche(spen);
      }
    });
  }


  showTransaction() {
    this.mctChitietService.show(this.adduserservice.getUser().id).subscribe((data) => {
      this.Transaction = data;
      console.log(this.Transaction)
    })
  }

  fromday = new FormGroup({
    day1: new FormControl(),
    day2: new FormControl(),
  })

  seachDay() {
    let spendingday = {
      idUser: this.adduserservice.getUser().id,
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
    } else {
      // @ts-ignore
      document.getElementById("checkdate").style.display = "flex"
    }
  }

  checkdate(date : any): boolean {
    let d = new Date(date)
    if (this.datehientai.getDate() > d.getDate() || (this.datehientai.getMonth() + 1) > (d.getMonth() + 1)) {
      return false
    } else {
      return true
    }
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
  showcounttb() {
    this.notifi.showcounttb(this.loginService.getUserToken().id).subscribe((data) => {
      this.counttb.Sumnotification = data.sumnotification;
    });
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

    dalete(id:number){
    this.spendinglimitService.dalete(id).subscribe((data) => {
        this.showhanche()
      })
    }

  Formwallet = new FormGroup({
    money: new FormControl()
  })


  createmctChitieths() {
    let mtct = {
      name: "phụ huynh nạp tiền",
      namespending: "nạp tiền vào ví",
      money: this.Formwallet.value.money,
      user: {
        id: this.iduser
      }
    }

    this.mctChitietService.create(mtct).subscribe((data) => {
      this.showWallet();
      this.showTransaction();
      this.Formwallet = new FormGroup({
        money: new FormControl()
      })

    });
  }

  rechargehs() {
    let wallet = {
      id: this.wallets.id,
      money: (this.Formwallet.value.money + this.wallets.money),
      user: {
        id: this.iduser
      }
    }
      this.wallet.create(wallet).subscribe((data) => {
        let notifi = {
          user_sv: {
            id: this.adduserservice.getUser().id
          },
          user_ph: {
            id: this.loginService.getUserToken().id
          },
          content: "Phụ huynh đã nạp tiền cho bạn" + this.Formwallet.value.money + "VND",
        }
        this.notifiservice.add(notifi).subscribe((data) => {
        })
        this.createmctChitieths()
      })
  }
}


