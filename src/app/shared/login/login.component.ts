import { Component, OnInit } from '@angular/core';
import {AuthorizationService} from "../authorization.service";
import {User} from "../../../models/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private hasError;

  constructor(private auth: AuthorizationService, private router: Router) { }

  ngOnInit() {
    // this.login("ShaharR", "123456")
  }

  login(username: string, password: string){
    this.auth.login(username, password).subscribe((user: User) => {
      console.log(user)
      this.auth.user = user;
      this.router.navigateByUrl("main");
    }, (err) => {
      this.hasError = true;
    })
  }

}
