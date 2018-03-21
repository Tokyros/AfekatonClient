import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthorizationService} from "../../shared/authorization.service";
import {QuestionService} from "../question.service";
import {Question} from "../../shared/models/question";
import {CourseService} from "../course.service";
import {MatDialog} from "@angular/material";
import {PostQuestionComponent} from "../post-question/post-question.component";
import {Answer} from "../../shared/models/answer";

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

  openNewQuestionDialog(){
    (<any>this.dialog).open(PostQuestionComponent).afterClosed().subscribe(this.postQuestion)
  }

  postQuestion = (question: Question) => {
    this.questionService.submitQuestion(question).subscribe(() => this.updateQuestions());
  }

  openResponseDialog(question: Question){
    let questionId = question.messageId;
    (<any>this.dialog).open(PostQuestionComponent, {data: {entity: question, isResponse: true}}).afterClosed().subscribe((response) => {
      this.respondToQuestion(questionId, response);
    })
  }

  private respondToQuestion = (questionId: number, response: Answer) => {
    this.questionService.postAnswer(questionId, response.messageContent).subscribe(() => this.updateQuestions());
  }

  openEditDialog(question: Question){
    (<any>this.dialog).open(PostQuestionComponent, {data: {entity: question, isEdit: true}}).afterClosed().subscribe(this.postQuestion)
  }

  deleteQuestion = (question: Question) => {
    this.questionService.deleteQuestion(question).subscribe(() => this.updateQuestions());
  }


}
