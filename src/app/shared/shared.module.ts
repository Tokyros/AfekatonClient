import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthorizationService} from "./authorization.service";
import {HttpClientModule} from "@angular/common/http";
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import {MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule} from "@angular/material";
import { SignupComponent } from './signup/signup.component';
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [MatFormFieldModule,
    MatInputModule,
    MatButtonModule],
  providers: [AuthorizationService],
  declarations: [NotFoundComponent, LoginComponent, SignupComponent]
})
export class SharedModule { }
