import {User} from "../../models/user";
import {Answer} from "./answer";
import {Category} from "./category";
export class Question {
  answers?: Answer[];
  author?: User;
  category?: Category;
  id: number;
  question?: string;
}
