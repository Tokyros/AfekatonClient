import {Component, OnInit} from '@angular/core';
import {AuthorizationService} from "./shared/authorization.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private auth: AuthorizationService){}

  ngOnInit(){
    this.auth.login("ShaharR", "123456");
  }

  title = 'app';
}
