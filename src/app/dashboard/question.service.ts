import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../shared/models/user";
import {Question} from "../shared/models/question";
import {Answer} from "../shared/models/answer";

@Injectable()
export class QuestionService {

  private BASE_URL = "http://localhost:8080/"

  constructor(private httpClient: HttpClient) { }

  public getQuestions(query?: string){
    if (query){
      return this.httpClient.get(this.BASE_URL + "question?query="+query);
    } else {
      return this.httpClient.get(this.BASE_URL + "question");
    }
  }

  submitQuestion(question: Question) {
    return this.httpClient.post(this.BASE_URL + "question", question);
  }

  postAnswer(question: number, answer: string) {
    return this.httpClient.post(this.BASE_URL + `question/${question}/comment`, answer);
  }

  upvote(messageId: number) {
    return this.httpClient.get(this.BASE_URL + `question/${messageId}/upvote`);
  }

  downvote(messageId: number) {
    return this.httpClient.get(this.BASE_URL + `question/${messageId}/downvote`);
  }

  deleteQuestion(question: Question) {
    return this.httpClient.get(this.BASE_URL + `question/${question.messageId}/delete`);
  }
}
