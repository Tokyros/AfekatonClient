import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthorizationService} from "../../shared/authorization.service";
import {QuestionService} from "../question.service";
import {Question} from "../../shared/models/question";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public questions: Question[];

  public mode: string = "show";
  public body: any;

  constructor(private router: Router, public auth: AuthorizationService, private questionService: QuestionService) {

  }

  ngOnInit() {
    if (this.auth.token == null){
      this.router.navigateByUrl("");
    } else {
      this.auth.whoAmI();
      this.updateQuestion()
    }
  }

  private updateQuestion = (query?: string) => {
    this.questionService.getQuestions(query).subscribe((questions: any[]) => {
      this.questions = questions;
    })
  };

  upvoteQuestion(question: Question){
    this.questionService.upvote(question.messageId).subscribe(() => {
      this.updateQuestion();
    })
  }

  downvoteQuestion(question: Question){
    this.questionService.downvote(question.messageId).subscribe(() => {
      this.updateQuestion();
    })
  }

  submitQuestion() {
    this.questionService.submitQuestion(this.body).subscribe((res) => {
      this.updateQuestion();
    });
  }

  submitAnswer(question: Question, answer: string){
    this.questionService.postAnswer(question.messageId, answer).subscribe((res) => {
      this.updateQuestion();
    })
  }

  onQuestionButtonClicked(question: Question){
    this.submitAnswer(question, "TEST");
  }


}
