import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MctChitietService {

  constructor(private http:HttpClient) { }

  create(spending: any): Observable<any >{
    return this.http.post<any>("http://localhost:8080/spending",spending);
  }

  // show(id: any): Observable<any >{
  //   return this.http.get<any>("http://localhost:8080/spending/"+id);
  // }

  showcount(id: any): Observable<any >{
    return this.http.get<any>("http://localhost:8080/spending/showcount/"+id);
  }
  show(id: Number): Observable<any >{
    return this.http.get<any>("http://localhost:8080/spending/"+id);
  }
}


