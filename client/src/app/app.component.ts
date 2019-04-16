import { Component, OnInit } from "@angular/core";

import { UserService } from "./user.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  constructor(private userService: UserService) {}
  ngOnInit() {
    this.userService.validateToken().subscribe(response => {
      console.log(response);
      this.userService.loggedIn = response;
    });
  }
}
