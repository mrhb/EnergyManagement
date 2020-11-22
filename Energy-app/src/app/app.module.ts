import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './main/main.component';


import { SidebarComponent } from './main/sidebar/sidebar.component';
import { ManagementComponent } from './management/management.component';
import { ManagementModule } from './management/_management.module';
import { LoginComponent } from './auth/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.madule';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SidebarComponent,
    ManagementComponent,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,

    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ManagementModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
