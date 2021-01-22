import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {JwtService} from '../service/guard/jwt.service';
import {BaseGuardService} from '../service/guard/baseGuard.service';
import {CustomGuardService} from '../service/guard/custumGuard.service';
import {UserGuardService} from '../service/guard/user-guard.service';
import {AdminGuardService} from '../service/guard/adminGuard.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [JwtService, AdminGuardService, UserGuardService, CustomGuardService, BaseGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
