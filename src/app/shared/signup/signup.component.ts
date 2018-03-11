import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {AuthorizationService} from "../authorization.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public user: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private auth: AuthorizationService, private router: Router) { }

  ngOnInit() {
  }

  signUp(){
    // if (!this.user.valid) return
    console.log("Signing")
    this.auth.signup(this.user.value).subscribe((res) => {
      console.log(res)
      this.router.navigateByUrl("/main")
    }, (err) => {
      console.log(err.error.errors)
      let customErrors = {};
      err.error.errors.forEach((errorItem) => {
        customErrors[errorItem.field] = errorItem.defaultMessage;
      })
      console.log(this.user)
      // this.user.setErrors(customErrors);
    })
  }

}
