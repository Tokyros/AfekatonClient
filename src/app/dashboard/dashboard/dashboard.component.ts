import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthorizationService} from "../../shared/authorization.service";
import {QuestionService} from "../question.service";
import {Question} from "../question";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public questions: any[];

  private mode: string = "show";

  constructor(private router: Router, public auth: AuthorizationService, private questionService: QuestionService) { }

  ngOnInit() {
    if (this.auth.user == null){
      this.router.navigateByUrl("");
    } else {
      this.updateQuestion()
      // setInterval(this.updateQuestion, 10000);
    }
  }

  private updateQuestion = () => {
    this.questionService.getQuestions().subscribe((questions: any[]) => {
      this.questions = questions;
    })
  };

  submitQuestion(question: string) {
    this.questionService.submitQuestion(this.auth.user, question).subscribe((res) => {
      this.updateQuestion();
    }, (err) => {
      console.log(err)
      if (err.status === 400){
        alert(err.error.errors[0].defaultMessage)
      }
    });
  }

  submitAnswer(question: Question, answer: string){
    this.questionService.postAnswer(this.auth.user, question, answer).subscribe((res) => {
      this.updateQuestion();
    })
  }


}
