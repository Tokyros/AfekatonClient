import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HttpParams} from "@angular/common/http";
import {User} from "./models/user";
import {HttpHeaders} from "@angular/common/http";

import * as jwt from 'angular2-jwt'

@Injectable()
export class AuthorizationService {

  private static BASE_URL = "http://localhost:8080"
  private _user: User;
  public token: string;

  constructor(private httpClient: HttpClient) {
    this.token = this.getToken();
  }

  public login(username: string, password: string){
    return this.httpClient.post(AuthorizationService.BASE_URL + "/login", {username, password}, {observe: 'response'})
  }

  get user(): User {
    return this._user;
  }

  set user(value: User) {
    console.log("Assining user to app" + value)
    this._user = value;
  }

  signup(user: User) {
    return this.httpClient.post(AuthorizationService.BASE_URL + "/users/sign-up", user)
  }

  public getToken(){
    return localStorage.getItem("token");
  }

  public isAuthenticated(): boolean{
    const token = this.getToken();
    return jwt.tokenNotExpired(null, token);
  }
}
