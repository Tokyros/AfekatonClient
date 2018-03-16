import { Injectable } from '@angular/core';
import {HttpInterceptor} from "@angular/common/http";
import {HttpRequest} from "@angular/common/http";
import {HttpHandler} from "@angular/common/http";
import {Observable} from "rxjs";
import {HttpEvent} from "@angular/common/http";
import {AuthorizationService} from "./shared/authorization.service";

@Injectable()
export class TokenInterceptorService implements HttpInterceptor{
  token: string;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.token){
      this.token = this.auth.getToken();
    }
    req = req.clone({setHeaders: {
      Authorization: this.token + ""
    }})

    return next.handle(req);
  }

  constructor(public auth: AuthorizationService) { }

}
