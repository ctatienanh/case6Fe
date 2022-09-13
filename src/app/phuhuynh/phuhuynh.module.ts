import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhuhuynhRoutingModule } from './phuhuynh-routing.module';
import { HomephComponent } from './homeph/homeph.component';
import { TkquanlyComponent } from './tkquanly/tkquanly.component';
import { MucchitieuComponent } from './mucchitieu/mucchitieu.component';
import { ProfilephComponent } from './profileph/profileph.component';


@NgModule({
  declarations: [
    HomephComponent,
    TkquanlyComponent,
    MucchitieuComponent,
    ProfilephComponent
  ],
  imports: [
    CommonModule,
    PhuhuynhRoutingModule
  ]
})
export class PhuhuynhModule { }
