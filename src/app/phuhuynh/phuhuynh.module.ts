import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhuhuynhRoutingModule } from './phuhuynh-routing.module';
import { HomephComponent } from './homeph/homeph.component';
import { TkquanlyComponent } from './tkquanly/tkquanly.component';
import { ProfilephComponent } from './profileph/profileph.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    HomephComponent,
    TkquanlyComponent,
    ProfilephComponent
  ],
    imports: [
        CommonModule,
        PhuhuynhRoutingModule,
        ReactiveFormsModule
    ]
})
export class PhuhuynhModule { }
