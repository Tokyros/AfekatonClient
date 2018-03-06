import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import {QuestionService} from "./question.service";
import {SharedModule} from "../shared/shared.module";
import { QuestionComponent } from './question/question.component';
import { AnswerComponent } from './answer/answer.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [DashboardComponent, QuestionComponent, AnswerComponent],
  providers: [QuestionService],
  exports: [DashboardComponent]
})
export class DashboardModule { }
