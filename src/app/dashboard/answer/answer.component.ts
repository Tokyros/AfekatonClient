import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Answer} from "../../shared/models/answer";
import {AuthorizationService} from "../../shared/authorization.service";
import {MatDialog} from "@angular/material";
import {PostQuestionComponent} from "../post-question/post-question.component";
import {Question} from "../../shared/models/question";
import {AnswerService} from "../services/answer.service";

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {

  @Input() answer: Answer;
  @Input() isAuthor: boolean;
  @Input() withCommenting: boolean = true;
  @Input() isCorrect: boolean;

  @Output() answerUpdated: EventEmitter<void> = new EventEmitter();
  @Output() markedCorrect: EventEmitter<void> = new EventEmitter();
  @Output() deleteAnswer: EventEmitter<void> = new EventEmitter();

  constructor(public auth: AuthorizationService, private answerService: AnswerService, private dialog: MatDialog) { }

  ngOnInit() {
  }


  upvoteQuestion(){
    this.answerService.upVoteQuestion(this.answer.messageId).subscribe(() => {
      this.onQuestionUpdated()
    })
  }

  downvoteQuestion(){
    this.answerService.downVoteQuestion(this.answer.messageId).subscribe(() => {
      this.onQuestionUpdated()
    })
  }

  onQuestionUpdated(){
    this.answerUpdated.emit();
  }


  openResponseDialog(){
    (<any>this.dialog).open(PostQuestionComponent, {data: {entity: new Question(), isResponse: true}}).afterClosed().subscribe((response) => {
      this.respondeToAnswer(response);
    })
  }

  private respondeToAnswer = (response: Answer) => {
    this.answerService.commentMessage(this.answer.messageId, response.messageContent).subscribe(() => this.onQuestionUpdated());
  };

  openEditDialog(){
    (<any>this.dialog).open(PostQuestionComponent, {data: {entity: Object.assign({}, this.answer), isEdit: true}}).afterClosed().subscribe((answer: Answer) => {
      this.answerService.submitAnswer(answer).subscribe(() => {
        this.onQuestionUpdated();
      })
    })
  }

  deleteQuestion = () => {
    this.deleteAnswer.emit();
  }

  markCorrect(){
    this.markedCorrect.emit();
  }

  isVoted(){
    return typeof this.getVote() !== 'undefined';
  }

  private getVote() : number {
    return this.answer.userRatings && this.answer.userRatings[this.auth.user.username];
  }

  isUpvoted(){
    return this.isVoted() && this.getVote() > 0;
  }

  isDownvoted(){
    return this.isVoted() && this.getVote() < 0;
  }

  getUpvoteColor(){
    if (this.isUpvoted()) return 'green';
    return 'black'
  }

  getDownvoteColor(){
    if (this.isDownvoted()) return 'red';
    return 'black';
  }
}
