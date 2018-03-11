import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../shared/models/user";
import {Question} from "../shared/models/question";
import {Answer} from "../shared/models/answer";

@Injectable()
export class QuestionService {

  private BASE_URL = "http://localhost:8080/"

  constructor(private httpClient: HttpClient) { }

  public getQuestions(){
    return this.httpClient.get(this.BASE_URL + "question");
  }

  submitQuestion(user: User, question: string) {
    return this.httpClient.post(this.BASE_URL + "question", {
      category: {course: {id: 90905}},
      customCategory: "test",
      question,
      author: user
    })
  }

  postAnswer(user: User, question: Question, answer: string) {
    let newAnswer = new Answer();
    newAnswer.answer = answer;
    newAnswer.author = <User>{id: user.id};
    newAnswer.question = <Question>{id: question.id};
    return this.httpClient.post(this.BASE_URL + "answer", newAnswer);
  }
}
