import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {UserToken} from "../model/UserToken";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Spending} from "../model/spending";
import {LoginserviceService} from "./loginservice.service";

@Injectable({
  providedIn: 'root'
})
export class SpendingService {

  constructor(private http:HttpClient,private router: Router,private loginService: LoginserviceService) { }

  create(spending: any): Observable<any >{
    return this.http.post<any>("http://localhost:8080/spendingGoal",spending);
  }

  show(id: Number): Observable<any >{
    return this.http.get<any>("http://localhost:8080/spendingGoal/"+id);
  }

  showedit(id: Number): Observable<any >{
    return this.http.get<any>("http://localhost:8080/spendingGoal/detail/"+id);
  }

  checkname(name: any): Observable<any >{
    return this.http.get<any>("http://localhost:8080/spendingGoal/check/"+name);
  }




}
