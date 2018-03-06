import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthorizationService} from "./authorization.service";
import {HttpClientModule} from "@angular/common/http";
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import {MatFormFieldModule, MatInputModule, MatButtonModule} from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  exports: [MatFormFieldModule,
    MatInputModule,
    MatButtonModule],
  providers: [AuthorizationService],
  declarations: [NotFoundComponent, LoginComponent]
})
export class SharedModule { }
