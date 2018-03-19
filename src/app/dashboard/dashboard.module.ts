import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import {QuestionService} from "./question.service";
import {SharedModule} from "../shared/shared.module";
import { QuestionComponent } from './question/question.component';
import { AnswerComponent } from './answer/answer.component';
import {CourseService} from "./course.service";
import { PostQuestionComponent } from './post-question/post-question.component';
import {FroalaEditorModule, FroalaViewModule} from "angular-froala-wysiwyg";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()
  ],
  declarations: [DashboardComponent, QuestionComponent, AnswerComponent, PostQuestionComponent],
  providers: [QuestionService, CourseService],
  exports: [DashboardComponent]
})
export class DashboardModule { }
