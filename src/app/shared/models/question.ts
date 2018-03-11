import {User} from "./user";
import {Answer} from "./answer";
import {Category} from "../../dashboard/category";
export class Question {
  answers?: Answer[];
  author?: User;
  category?: Category;
  id: number;
  question?: string;
}
