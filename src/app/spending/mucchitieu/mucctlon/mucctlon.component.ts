import {Component, OnChanges, OnInit} from '@angular/core';
import {ScriptService} from "../../../service/script.service";
import {LoginserviceService} from "../../../service/loginservice.service";
import {FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {SpendingService} from "../../../service/spending.service";
import {Spending} from "../../../model/spending";
import {Router} from "@angular/router";

@Component({
  selector: 'app-mucctlon',
  templateUrl: './mucctlon.component.html',
  styleUrls: ['./mucctlon.component.css']
})
export class MucctlonComponent implements OnInit, OnChanges {
  spendinggoal: Spending[] = [];
  showspendingg: Spending = new Spending(0, "");

  constructor(private script: ScriptService, private loginService: LoginserviceService, private spendingService: SpendingService, private router: Router) {
  }

  ngOnInit(): void {
    this.script.load('global', 'Chartbundle', 'jquerymin', 'jquerydataTables', 'datatables', 'custom', 'dlabnav').then(data => {
    }).catch(error => console.log(error));
    this.showspending()

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

    if (this.Formspen.valid){

      this.spendingService.checkname(spen).subscribe((data) => {
        if (data != null){
          // @ts-ignore
          document.getElementById("checknamemct").style.display = "block"
        }else {
          this.checkname()
        }
      })
    }else {
      // @ts-ignore
      document.getElementById("createmct").style.display = "block"
    }
  }

checkname(){
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

  showedit(id: Number) {
    this.spendingService.showedit(id).subscribe((data) => {
      this.FormspenEdit = new FormGroup({
        id: new FormControl(id),
        name: new FormControl(data.name, Validators.required)
      })
      console.log(this.FormspenEdit.value)
    })
  }


  checkedit(){
    let spen = {
      name: this.FormspenEdit.value.name,
      idUser: this.Formspen.value.iduser
    }

    if (this.FormspenEdit.valid){

      this.spendingService.checkname(spen).subscribe((data) => {
        if (data != null){
          // @ts-ignore
          document.getElementById("checkeditmct").style.display = "block"
        }else {
          this.editspending()
        }
      })
    }else {
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
      this.showspending()
    })
  }

  deletespending(spending: Spending) {
    this.spendingService.delete(spending).subscribe((data) => {
      this.showspending()
    })
  }


}
