import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import {QuestionService} from "./services/question.service";
import {SharedModule} from "../shared/shared.module";
import { QuestionComponent } from './question/question.component';
import { AnswerComponent } from './answer/answer.component';
import {CourseService} from "./course.service";
import { PostQuestionComponent } from './post-question/post-question.component';
import {FroalaEditorModule, FroalaViewModule} from "angular-froala-wysiwyg";
import {AnswerService} from "./services/answer.service";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()
  ],
  declarations: [DashboardComponent, QuestionComponent, AnswerComponent, PostQuestionComponent],
  providers: [QuestionService, AnswerService, CourseService],
  exports: [DashboardComponent]
})
export class DashboardModule { }
