import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HttpParams} from "@angular/common/http";
import {User} from "./models/user";
import {HttpHeaders} from "@angular/common/http";

@Injectable()
export class AuthorizationService {

  private static BASE_URL = "http://localhost:8080"
  private _user: User;

  constructor(private httpClient: HttpClient) { }

  public login(username: string, password: string){
    let params = new HttpParams();
    params = params.set("username", username);
    params = params.set("password", password);
    return this.httpClient.get(AuthorizationService.BASE_URL + "/user/login", {params})
  }


  get user(): User {
    return this._user;
  }

  set user(value: User) {
    console.log("Assining user to app" + value)
    this._user = value;
  }

  signup(user: User) {
    return this.httpClient.post(AuthorizationService.BASE_URL + "/user", user)
  }
}
