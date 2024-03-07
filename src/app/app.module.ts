import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VexModule } from '../@vex/vex.module';
import { HttpClientModule } from '@angular/common/http';
import { CustomLayoutModule } from './custom-layout/custom-layout.module';
import { AuthService } from './services/auth.service';
import { AuthGuardPrivateUser } from './guards/privateUser';
import { AuthGuardPubliceUser } from './guards/publicUser';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    // Vex
    VexModule,
    CustomLayoutModule
  ],
  providers: [AuthService, AuthGuardPrivateUser, AuthGuardPubliceUser],
  bootstrap: [AppComponent]
})
export class AppModule { }
