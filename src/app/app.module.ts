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
import {CommonModule, HashLocationStrategy, LocationStrategy} from '@angular/common';
import {PipeModule} from './shared/tools/pipe-module';
import {NgxEchartsModule} from 'ngx-echarts';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        PipeModule,
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        NgxEchartsModule.forRoot({
          /**
           * This will import all modules from echarts.
           * If you only need custom modules,
           * please refer to [Custom Build] section.
           */
          echarts: () => import('echarts'), // or import('./path-to-my-custom-echarts')
        }),
    ],
    providers: [JwtService, AdminGuardService, UserGuardService, CustomGuardService, BaseGuardService,
        {provide: LocationStrategy, useClass: HashLocationStrategy},
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
