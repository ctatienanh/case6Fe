import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login/login.component";
import {RegisterComponent} from "./login/register/register.component";
import {SpendingModule} from "./spending/spending.module";
import {HomeComponent} from "./spending/home/home.component";
import {SvGuard} from "./spending/sv.guard";
import {PhGuard} from "./phuhuynh/ph.guard";
import {ErrComponent} from "./404/err/err.component";

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'err', component: ErrComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: 'spending',
    loadChildren: () => import('../app/spending/spending.module').then(module => module.SpendingModule),
    canActivate: [SvGuard]
  },
  {
    path: 'ph',
    loadChildren: () => import('../app/phuhuynh/phuhuynh.module').then(module => module.PhuhuynhModule),
    canActivate: [PhGuard]

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
