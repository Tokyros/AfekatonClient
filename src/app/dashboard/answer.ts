import {User} from "../../models/user";
import {Question} from "./question";
export class Answer {
  answer: string;
  author: User;
  id: number
  question: Question;
}
