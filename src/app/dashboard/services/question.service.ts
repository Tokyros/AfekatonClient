import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Question} from "../../shared/models/question";

@Injectable()
export class QuestionService {

  private BASE_URL = "http://localhost:8080/questions";

  constructor(private httpClient: HttpClient) { }

  public getQuestions(query: string = ""){
    return this.httpClient.get(this.BASE_URL, {params: {query}});
  }

  submitQuestion(question: Question) {
    return this.httpClient.post(this.BASE_URL, question);
  }

  commentMessage(messageId: number, message: string) {
    return this.httpClient.post(this.BASE_URL + `/${messageId}/comment`, message);
  }

  upVoteMessage(messageId: number) {
    return this.httpClient.get(this.BASE_URL + `/${messageId}/upVote`);
  }

  downVoteMessage(messageId: number) {
    return this.httpClient.get(this.BASE_URL + `/${messageId}/downVote`);
  }

  deleteMessage(question: Question) {
    return this.httpClient.delete(this.BASE_URL + `/${question.messageId}`);
  }

  deleteComment(messageId: number, answerId: number) {
    return this.httpClient.delete(this.BASE_URL + `/${messageId}/${answerId}`);
  }

  markAnswerCorrect(messageId: number, answerId: number) {
    return this.httpClient.get(this.BASE_URL + `/${messageId}/markCorrect/${answerId}`);
  }
}
