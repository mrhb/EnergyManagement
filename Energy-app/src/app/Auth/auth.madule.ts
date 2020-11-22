import { NgModule } from '@angular/core';
import { ErrorInterceptor, fakeBackendProvider, JwtInterceptor } from './_helpers';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


const modules = [

];

@NgModule({
providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider
],

  imports: modules,
  exports: modules,
})
export class AuthModule {}
