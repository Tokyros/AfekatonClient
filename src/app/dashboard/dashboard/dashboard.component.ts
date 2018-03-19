import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthorizationService} from "../../shared/authorization.service";
import {QuestionService} from "../question.service";
import {Question} from "../../shared/models/question";
import {HttpErrorResponse} from "@angular/common/http";
import {CourseService} from "../course.service";
import {MatOptionSelectionChange, MatAutocompleteSelectedEvent, MatDialog} from "@angular/material";
import {PostQuestionComponent} from "../post-question/post-question.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public questions: Question[];


  constructor(private dialog: MatDialog, private router: Router, public auth: AuthorizationService, private questionService: QuestionService, private coursesService: CourseService) {

  }

  ngOnInit() {
    if (this.auth.token == null){
      this.router.navigateByUrl("");
    } else {
      this.auth.whoAmI();
      this.updateQuestions()
    }
  }

  private updateQuestions = (query?: string) => {
    this.questionService.getQuestions(query).subscribe((questions: any[]) => {
      this.questions = questions;
    })
  };

  upvoteQuestion(question: Question){
    this.questionService.upvote(question.messageId).subscribe(() => {
      this.updateQuestions();
    })
  }

  downvoteQuestion(question: Question){
    this.questionService.downvote(question.messageId).subscribe(() => {
      this.updateQuestions();
    })
  }

  openQuestionDialog(){
    (<any>this.dialog).open(PostQuestionComponent).afterClosed().subscribe(() => this.updateQuestions())
  }

  responseToQuestion(question: Question){
    (<any>this.dialog).open(PostQuestionComponent, {data: question}).afterClosed().subscribe(console.log)
  }

  openQuestionForEdit(question: Question){
    (<any>this.dialog).open(PostQuestionComponent, {data: question}).afterClosed().subscribe(() => this.updateQuestions())
  }

  deleteQuestion(question: Question){
    this.questionService.deleteQuestion(question).subscribe(() => this.updateQuestions());
  }
}
