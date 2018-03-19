import {User} from "./user";
import {Answer} from "./answer";
import {Category} from "../../dashboard/category";
import {Message} from "./message";
export class Question extends Message{
  relatedCourse: {name: string} = {};
  relatedDepartment: string;
}
