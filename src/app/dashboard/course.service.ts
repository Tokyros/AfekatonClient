import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthorizationService} from "../shared/authorization.service";

@Injectable()
export class CourseService {

  constructor(private http: HttpClient) { }

  getCourses(query?: string){
    if (query){
      return this.http.get(AuthorizationService.BASE_URL + "/course?query="+query);
    }
    return this.http.get(AuthorizationService.BASE_URL + "/course")
  }

}
