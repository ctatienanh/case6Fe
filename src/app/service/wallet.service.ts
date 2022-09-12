import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(private http:HttpClient) { }

  create(wallet: any): Observable<any >{
    return this.http.post<any>("http://localhost:8080/wallet",wallet);
  }

  show(id: number): Observable<any >{
    return this.http.get<any>("http://localhost:8080/wallet/"+id);
  }


}
