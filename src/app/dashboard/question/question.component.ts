import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Question} from "../../shared/models/question";
import {AuthorizationService} from "../../shared/authorization.service";
import {QuestionService} from "../services/question.service";
import {MatDialog} from "@angular/material";
import {PostQuestionComponent} from "../post-question/post-question.component";
import {Answer} from "../../shared/models/answer";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  @Input() question: Question;

  @Output() questionUpdated: EventEmitter<void> = new EventEmitter();

  constructor(public auth: AuthorizationService, private questionService: QuestionService, private dialog: MatDialog) { }

  ngOnInit() {
  }

  markAnswerCorrect(answerId: number){

    this.questionService.markAnswerCorrect(this.question.messageId, answerId).subscribe(() => {
      this.onQuestionUpdated();
    })
  }

  upvoteQuestion(question: Question){
    this.questionService.upVoteMessage(question.messageId).subscribe(() => {
      this.onQuestionUpdated();
    })
  }

  downvoteQuestion(question: Question){
    this.questionService.downVoteMessage(question.messageId).subscribe(() => {
      this.onQuestionUpdated();
    })
  }

  onQuestionUpdated(){
    this.questionUpdated.emit();
  }

  openNewQuestionDialog(){
    (<any>this.dialog).open(PostQuestionComponent).afterClosed().subscribe(this.postQuestion)
  }

  postQuestion = (question: Question) => {
    this.questionService.submitQuestion(question).subscribe(() => this.onQuestionUpdated());
  };

  openResponseDialog(question: Question){
    (<any>this.dialog).open(PostQuestionComponent, {data: {entity: new Question(), isResponse: true}}).afterClosed().subscribe((response) => {
      this.respondToQuestion(question.messageId, response);
    })
  }

  private respondToQuestion = (questionId: number, response: Answer) => {
    this.questionService.commentMessage(questionId, response.messageContent).subscribe(() => this.onQuestionUpdated());
  };

  openEditDialog(question: Question){
    (<any>this.dialog).open(PostQuestionComponent, {data: {entity: Object.assign({}, this.question), isEdit: true}}).afterClosed().subscribe(this.postQuestion)
  }

  deleteQuestion = (question: Question) => {
    if (confirm("השאלה תמחק, להמשיך?")) this.questionService.deleteMessage(question).subscribe(() => this.onQuestionUpdated());
  }

  deleteAnswer(answerId: number){
    if (confirm("התגובה תמחק, להמשיך?")) this.questionService.deleteComment(this.question.messageId, answerId).subscribe(() => this.onQuestionUpdated());
  }

  isVoted(){
    return typeof this.getVote() !== 'undefined';
  }

  private getVote() : number {
    return this.question.userRatings && this.question.userRatings[this.auth.user.username];
  }

  isUpvoted(){
    return this.isVoted() && this.getVote() > 0;
  }

  isDownvoted(){
    return this.isVoted() && this.getVote() < 0;
  }

  getUpvoteColor(){
    if (this.isUpvoted()) return 'lightgreen';
    return 'black'
  }

  getDownvoteColor(){
    if (this.isDownvoted()) return 'red';
    return 'black';
  }
}
