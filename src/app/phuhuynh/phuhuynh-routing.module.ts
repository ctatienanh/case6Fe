import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "../spending/home/home.component";
import {HomephComponent} from "./homeph/homeph.component";

const routes: Routes = [
  {path: '', component: HomephComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhuhuynhRoutingModule { }
