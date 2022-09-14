import { Component, OnInit } from '@angular/core';
import {ScriptService} from "../../service/script.service";
import {LoginserviceService} from "../../service/loginservice.service";
import {AppUser} from "../../model/AppUser";
import {finalize, Observable} from "rxjs";
import {ProfileService} from "../../service/profile.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {FormControl, FormGroup} from "@angular/forms";

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

  constructor(private script: ScriptService, private profileservice: ProfileService, private router: Router, private route: ActivatedRoute, private loginService: LoginserviceService, private storage: AngularFireStorage) {
  }
  ngOnInit(): void {

    this.script.load('global', 'bootstrap-select', 'jquerymin', 'Chartbundle', 'lightgallery-all', 'custom', 'dlabnav', 'upimg').then(data => {
    }).catch(error => console.log(error));
    this.showUser()


  }

  logout(){
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



}
