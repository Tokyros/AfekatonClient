import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {AuthorizationService} from "../authorization.service";
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public user: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
    afekaRole: new FormControl('', [Validators.required]),
    department: new FormControl('', [Validators.required]),
  });

  constructor(private auth: AuthorizationService, private router: Router, private dialogRef: MatDialogRef<SignupComponent>) { }

  ngOnInit() {
  }

  signUp(){
    this.auth.signup(this.user.value).subscribe((res) => {
      this.dialogRef.close();
      // this.router.navigateByUrl("/main")
    }, (err) => {
      let customErrors = {};
      err.error.errors.forEach((errorItem) => {
        customErrors[errorItem.field] = errorItem.defaultMessage;
      })
      console.log(this.user)
      // this.user.setErrors(customErrors);
    })
  }

  formatRole = (value: string) => {
    switch (value){
      case "TEACHER":
        return 'מרצה';
      case "STUDENT":
        return 'סטודנט';
      case "ADMINISTRATION":
        return 'מנהלה';
    }
  };

  formatDepartment = (value: string) => {
    switch (value){
      case "SCIENCE":
        return "מדעי היסוד";
      case "SOFTWARE":
        return "תוכנה";
      case "ELECTRIC":
        return "חשמל";
      case "MEDICAL":
        return "רפואית";
      case "MECHANICAL":
        return "מכונות";
      case "INDUSTRIAL":
        return "תעשייה וניהול"
    }
  };

}
