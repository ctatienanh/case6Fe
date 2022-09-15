import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SpendinglimitService {

  constructor(private http:HttpClient) { }

  save(spen: any): Observable<any >{
    return this.http.post<any>("http://localhost:8080/spendinglimit",spen);
  }
}
