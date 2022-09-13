import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class NotificationserviceService {

  constructor(private http:HttpClient) { }

  add(notifi : any): Observable<any> {
    return  this.http.post<any>("http://localhost:8080/notificationadd", notifi);
  }

  show(id : any): Observable<any> {
    return  this.http.get<any>("http://localhost:8080/notificationadd/show/"+ id);
  }
}
