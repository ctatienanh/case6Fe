import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpendingRoutingModule } from './spending-routing.module';
import { HomeComponent } from './home/home.component';
import { MucctlonComponent } from './mucchitieu/mucctlon/mucctlon.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ProfileComponent } from './profile/profile.component';
import { WalletComponent } from './wallet/wallet.component';


@NgModule({
  declarations: [
    HomeComponent,
    MucctlonComponent,
    ProfileComponent,
    WalletComponent
  ],
    imports: [
        CommonModule,
        SpendingRoutingModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class SpendingModule { }
