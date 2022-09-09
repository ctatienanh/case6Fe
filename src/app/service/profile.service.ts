import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {LoginserviceService} from "./loginservice.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http:HttpClient,private router: Router,private loginService: LoginserviceService) { }

  show(id: Number): Observable<any >{
    return this.http.get<any>("http://localhost:8080/profile/"+id);
  }

  create(AppUser: any): Observable<any >{
    return this.http.post<any>("http://localhost:8080/profile/create",AppUser);
  }
}
