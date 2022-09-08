import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {LoginserviceService} from "../service/loginservice.service";

@Injectable({
  providedIn: 'root'
})
export class PhGuard implements CanActivate {
  constructor(private loginService: LoginserviceService,private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let userToken = this.loginService.getUserToken();
    for (const role of userToken?.roles) {
      if (role.name == "ph") {
        return true;
      }else {
        this.router.navigate(["/err"])
      }
    }
    this.router.navigate(["/err"])
    return false;
  }

}
