import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthorizationService} from "../shared/authorization.service";
import {Course} from "../shared/models/Course";

@Injectable()
export class CourseService {

  private courses: Course[] = [];

  constructor(private http: HttpClient) {
    this.getCourses().subscribe((result: Course[]) => this.courses = result);
  }

  getCourses(query: string = ""){
    return this.http.get(AuthorizationService.BASE_URL + "/course?query="+query);
  }

  getCoursesWithFilter(query: string = ""){
    return this.courses.filter((course: Course) => course.name.indexOf(query) > -1 || course.id.toString().indexOf(query) > -1)
  }

}
