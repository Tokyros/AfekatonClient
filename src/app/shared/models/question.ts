import {User} from "./user";
import {Answer} from "./answer";
import {Category} from "../../dashboard/category";
import {Message} from "./message";
import {Course} from "./Course";
export class Question extends Message{
  relatedCourse: Course;
  relatedDepartment: string;
}
