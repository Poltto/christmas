import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { ApiService } from './api.service';
import { RouterOutlet } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthGuardService } from './auth-guard.service';
import { CalendarDoorComponent } from './door/door.component';
import { CalendarOpenDoorComponent } from './open-door/open-door.component';
import { GlitterComponent } from './glitter/glitter.component';
import { HttpInterceptor } from './http.interceptor';
import { CalendarDoorMessageComponent } from './calendar-door-message/calendar-door-message.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    CalendarDoorComponent,
    CalendarOpenDoorComponent,
    GlitterComponent,
    CalendarDoorMessageComponent
  ],
  exports: [
    MainComponent,
    LoginComponent,
    CalendarDoorComponent,
    CalendarOpenDoorComponent,
    GlitterComponent,
    CalendarDoorMessageComponent
  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule
  ],
  providers: [ApiService, AuthGuardService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
