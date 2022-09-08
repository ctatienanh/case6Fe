import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpendingRoutingModule } from './spending-routing.module';
import { HomeComponent } from './home/home.component';
import { MucctlonComponent } from './mucchitieu/mucctlon/mucctlon.component';
import {ReactiveFormsModule} from "@angular/forms";
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    HomeComponent,
    MucctlonComponent,
    ProfileComponent
  ],
    imports: [
        CommonModule,
        SpendingRoutingModule,
        ReactiveFormsModule
    ]
})
export class SpendingModule { }
