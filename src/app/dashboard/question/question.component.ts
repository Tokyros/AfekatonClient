import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Question} from "../question";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  @Input() question: Question;

  @Output() questionAnswered: EventEmitter<{answer: string, question: Question}> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  submitAnswer(answerText: string){
    this.questionAnswered.emit({answer: answerText, question: this.question});
  }

}
