import {Component, OnInit, Inject} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {CourseService} from "../course.service";
import {QuestionService} from "../question.service";
import {MatAutocompleteSelectedEvent, MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Observable} from "rxjs";
import {map} from "rxjs/operators/map";
import {Question} from "../../shared/models/question";
import {Course} from "../../shared/models/Course";

@Component({
  selector: 'app-post-question',
  templateUrl: './post-question.component.html',
  styleUrls: ['./post-question.component.css']
})
export class PostQuestionComponent implements OnInit {

  coursesFormControl: FormControl = new FormControl(null, [Validators.nullValidator]);
  courseOptions: Observable<Course[]>;
  courses: Course[] = [];

  question: Question = new Question();

  constructor(private coursesService: CourseService, private questionService: QuestionService, public dialogRef: MatDialogRef<PostQuestionComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data) {
      console.log(data)
      this.question = data;
      this.coursesFormControl.setValue(this.question.relatedCourse.name)
    }
  }


  ngOnInit() {
    this.updateCourses();
    this.courseOptions = this.coursesFormControl.valueChanges.pipe(map(val => this.courseFilter(val)));
  }

  courseFilter(val: any): Course[] {
    if (typeof val === 'object') return;
    return this.courses.filter((option: Course) =>
      (option.id + "").toLowerCase().indexOf((val + "").toLowerCase()) > -1 ||
    option.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
  }

  formatCourse(course){
    return course ? course.name : null;
  }

  updateCourses(query?: string) {
    this.coursesService.getCourses(query).subscribe((res: any[]) => {
      this.courses = res;
    })
  }

  submitQuestion() {
    this.questionService.submitQuestion(this.question).subscribe((res) => {
      (<any>this.dialogRef).close(this.question)
    });
  }

  onOptionSelected($event: MatAutocompleteSelectedEvent){
    this.question.relatedCourse = this.coursesFormControl.value;
  }

  opts = {
    direction: 'rtl',
    height: '300px',
    placeholderText: 'גוף השאלה...',
    width: '80%',
  }

}
