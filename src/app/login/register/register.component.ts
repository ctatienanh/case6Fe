import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LoginserviceService} from "../../service/loginservice.service";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {ScriptService} from "../../service/script.service";
import {WalletService} from "../../service/wallet.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  checkuserr: boolean = false;

  constructor(private service: LoginserviceService, private script: ScriptService, private router: Router, private  wallservic: WalletService) {
  }

  ngOnInit(): void {

  }

  regisiterForm = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
    email: new FormControl("", Validators.required),
    roles: new FormArray([new FormGroup({
      id: new FormControl(Validators.required)
    })])
  })
  roles = this.regisiterForm.get('roles') as FormArray;




  register() {
    this.roles.value[0].id = this.roles.value[0].id == 2 ? 2 : 3
    this.checkuser()
  }

  checkuser() {
    this.service.checkuser(this.regisiterForm.value.username).subscribe((data) => {
        if (data != null) {
          // @ts-ignore
          document.getElementById("checkName").style.display = "flex";
        } else {
           this.checkemail()
        }
      }
    )
  }

  checkemail() {
    this.service.checkemail(this.regisiterForm.value.email).subscribe((data) => {
        if (data != null) {
          // @ts-ignore
          document.getElementById("checkMail").style.display = "flex";
        } else {

          if (this.regisiterForm.valid) {
            this.service.register(this.regisiterForm.value).subscribe((data) => {
             alert("Tao tai khoan thanh cong")
              this.service.setUser(data);
              this.router.navigate([""]);
              this.createwallet();
            })
          }
        }
      }
    )
  }

  createwallet(){
    let wallet = {
      money: 0,
      user: {
        id: this.service.getUser().id
      }
    }
    this.wallservic.create(wallet).subscribe((data) => {
      alert("Thêm Ví Thành Công")
      this.router.navigate([""]);
    })
  }


}
