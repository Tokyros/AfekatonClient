import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthorizationService} from "./authorization.service";
import {HttpClientModule} from "@angular/common/http";
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import {
  MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, MatSelectModule,
  MatToolbarModule, MatTabsModule, MatExpansionModule, MatDividerModule, MatAutocompleteModule, MatDialogModule,
  MatChipsModule
} from "@angular/material";
import { SignupComponent } from './signup/signup.component';
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {QuillModule} from "ngx-quill";
import {PostQuestionComponent} from "../dashboard/post-question/post-question.component";

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
    FormsModule,
    MatToolbarModule,
    MatSelectModule,
    QuillModule
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatToolbarModule,
    MatTabsModule,
    MatExpansionModule,
    MatCardModule,
    MatDividerModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatChipsModule,
    ReactiveFormsModule,
    FormsModule,
    QuillModule,
    FormsModule
  ],
  entryComponents: [PostQuestionComponent, SignupComponent],
  providers: [AuthorizationService],
  declarations: [NotFoundComponent, LoginComponent, SignupComponent]
})
export class SharedModule { }
