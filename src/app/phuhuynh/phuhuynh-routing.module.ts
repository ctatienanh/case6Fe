import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "../spending/home/home.component";
import {HomephComponent} from "./homeph/homeph.component";
import {TkquanlyComponent} from "./tkquanly/tkquanly.component";
import {MucchitieuComponent} from "./mucchitieu/mucchitieu.component";
import {ProfilephComponent} from "./profileph/profileph.component";

const routes: Routes = [
  {path: '', component: HomephComponent},
  {path: 'tk', component: TkquanlyComponent},
  {path: 'mct', component: MucchitieuComponent},
  {path: 'profile', component: ProfilephComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhuhuynhRoutingModule { }
