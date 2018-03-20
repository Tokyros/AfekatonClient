import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {SharedModule} from "./shared/shared.module";
import {Routes, RouterModule} from "@angular/router";
import {NotFoundComponent} from "./shared/not-found/not-found.component";
import {LoginComponent} from "./shared/login/login.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DashboardComponent} from "./dashboard/dashboard/dashboard.component";
import {DashboardModule} from "./dashboard/dashboard.module";
import {SignupComponent} from "./shared/signup/signup.component";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {TokenInterceptorService} from "./token-interceptor.service";


const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'main', component: DashboardComponent},
  {path: '**', redirectTo: '/login', pathMatch: 'full'},
]

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    BrowserAnimationsModule,
    DashboardModule,
    RouterModule.forRoot(appRoutes, {enableTracing: true})
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
