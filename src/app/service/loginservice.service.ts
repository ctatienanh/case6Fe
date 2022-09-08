import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserToken} from "../model/UserToken";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

  constructor(private http:HttpClient,private router: Router) { }

  login(user: any): Observable<UserToken>{
    return this.http.post<UserToken>("http://localhost:8080/login",user);
  }
  register(user: any): Observable<any>{
    return this.http.post<any>("http://localhost:8080/register",user);
  }

  checkuser(user : any): Observable<any> {
   return  this.http.post<any>("http://localhost:8080/checkuser", user);
  }

  checkemail(email : any): Observable<any> {
    return  this.http.post<any>("http://localhost:8080/checkemail", email);
  }

  setToken(token: string){
    localStorage.setItem("token",token);
  }

  getToken(){
    return localStorage.getItem("token");
  }
  setUserToken(userToken: UserToken){
    localStorage.setItem("userToken",JSON.stringify(userToken));
  }

  setUser(userToken: UserToken){
    localStorage.setItem("userwallet",JSON.stringify(userToken));
  }

  getUserToken(): UserToken{
    return JSON.parse(<string>localStorage.getItem("userToken"));
  }
  getUser(): UserToken{
    return JSON.parse(<string>localStorage.getItem("userwallet"));
  }
  checkrole(){
    let userToken = this.getUserToken();
    for (const role of userToken?.roles) {
      if (role.name == "ph") {
        this.router.navigate(["/ph"])
      }
      if(role.name=="sv"){
        this.router.navigate(["/spending"])
      }
    }
  }





  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("userToken")
    this.router.navigate(["/"])
  }

}
