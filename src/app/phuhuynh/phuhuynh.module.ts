import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhuhuynhRoutingModule } from './phuhuynh-routing.module';
import { HomephComponent } from './homeph/homeph.component';


@NgModule({
  declarations: [
    HomephComponent
  ],
  imports: [
    CommonModule,
    PhuhuynhRoutingModule
  ]
})
export class PhuhuynhModule { }
