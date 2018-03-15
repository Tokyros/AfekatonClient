import { Component, OnInit } from '@angular/core';
import {AuthorizationService} from "../authorization.service";
import {User} from "../models/user";
import {Router} from "@angular/router";
import {HttpResponse} from "@angular/common/http";

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
    this.auth.login(username, password).subscribe((response: HttpResponse<any>) => {
      this.auth.token = response.headers.get("Authorization");
      localStorage.setItem("token", response.headers.get("Authorization"));
      this.router.navigateByUrl("main");
    }, (err) => {
      this.hasError = true;
    })
  }

}
