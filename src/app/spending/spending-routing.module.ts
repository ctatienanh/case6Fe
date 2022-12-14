import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "../login/login/login.component";
import {HomeComponent} from "./home/home.component";
import {MucctlonComponent} from "./mucchitieu/mucctlon/mucctlon.component";
import {ProfileComponent} from "./profile/profile.component";
import {WalletComponent} from "./wallet/wallet.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'mctl', component: MucctlonComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'wallet', component: WalletComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpendingRoutingModule { }
