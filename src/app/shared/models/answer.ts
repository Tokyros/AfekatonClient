import {User} from "./user";
import {Question} from "./question";
import {Message} from "./message";

export class Answer extends Message{
  correct: boolean;
  questionId: number;
}
