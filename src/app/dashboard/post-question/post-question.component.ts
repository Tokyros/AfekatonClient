import {Component, OnInit, Inject, OnDestroy} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {CourseService} from "../course.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Subscription} from "rxjs";
import {Question} from "../../shared/models/question";
import {Course} from "../../shared/models/Course";

@Component({
  selector: 'app-post-question',
  templateUrl: './post-question.component.html',
  styleUrls: ['./post-question.component.css']
})
export class PostQuestionComponent implements OnInit, OnDestroy {

  coursesFormControl: FormControl = new FormControl(null, [Validators.nullValidator]);
  courses: Course[] = [];

  question: Question = new Question();
  valueChangeSubscription: Subscription;

  textEditorOptions = {
    direction: 'rtl',
    height: '300px',
    placeholderText: 'גוף השאלה...',
    width: '80%',
  };

  constructor(private coursesService: CourseService, public dialogRef: MatDialogRef<PostQuestionComponent>, @Inject(MAT_DIALOG_DATA) public data: {entity: Question, isEdit: boolean, isResponse: boolean}) {
  }

  ngOnInit() {
    if (this.data) {
      this.question = this.data.entity;
      this.coursesFormControl.setValue(this.question.relatedCourse)
    } else {
      this.data = <any>{}
    }

    this.updateCourses();
    this.valueChangeSubscription = this.coursesFormControl.valueChanges.subscribe(this.updateCourses)
  }

  ngOnDestroy() {
    this.valueChangeSubscription.unsubscribe();
  }

  formatCourse = (course) => {
    return course ? course.name : null;
  };

  updateCourses = (query?: string) => {
    this.courses = this.coursesService.getCoursesWithFilter(query);
  }

  submitQuestion() {
    (<any>this.dialogRef).close(this.question)
  }

  onOptionSelected(){
    this.question.relatedCourse = this.coursesFormControl.value;
  }

  getSubmitText(){
    if (this.data.isEdit) return "שמור עריכה";
    if (this.data.isResponse) return "פרסם תגובה";
    return "פרסם שאלה חדשה"
  }
}
