import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthorizationService} from "../../shared/authorization.service";
import {QuestionService} from "../services/question.service";
import {Question} from "../../shared/models/question";
import {CourseService} from "../course.service";
import {MatDialog} from "@angular/material";
import {PostQuestionComponent} from "../post-question/post-question.component";
import {Answer} from "../../shared/models/answer";
import {Message} from "../../shared/models/message";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public questions: Question[] = [];
  public searchQuery: string = "";

  constructor(private router: Router, public auth: AuthorizationService, private questionService: QuestionService, private dialog: MatDialog) {}

  ngOnInit() {
    if (this.auth.token == null){
      this.router.navigateByUrl("");
    } else {
      this.auth.whoAmI();
      this.updateQuestions()
    }
  }

  private updateQuestions = () => {
    this.questionService.getQuestions(this.searchQuery).subscribe((questions: any[]) => {
      this.questions = questions;
    })
  };


  openNewQuestionDialog(){
    (<any>this.dialog).open(PostQuestionComponent).afterClosed().subscribe((question: Question) => this.saveMessage(question))
  }

  saveMessage(question: Question){
    this.questionService.submitQuestion(question).subscribe(() => this.updateQuestions());
  }


}
