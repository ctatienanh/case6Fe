import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {UserToken} from "../model/UserToken";
import {AppUser} from "../model/AppUser";

@Injectable({
  providedIn: 'root'
})
export class AdduserService {

  constructor(private http:HttpClient,private router: Router) { };
  AddUser(AddUser: any): Observable<any >{
    return this.http.post<any>("http://localhost:8080/adduser",AddUser);
  }

  getallbyid(id: Number): Observable<any >{
    return this.http.get<any>("http://localhost:8080/adduser/show/"+id);
  }

  showuser(user : any): Observable<any >{
    return this.http.post<any>("http://localhost:8080/checkuser", user);
  }

  setUser(userToken: UserToken){
    localStorage.setItem("usersv",JSON.stringify(userToken));
  }

  getUser(): AppUser{
    return JSON.parse(<string>localStorage.getItem("usersv"));
  }
}
