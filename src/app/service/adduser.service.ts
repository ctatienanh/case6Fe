import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

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
}
