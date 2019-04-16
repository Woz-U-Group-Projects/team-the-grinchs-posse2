import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { User } from "../user";
import { UserService } from "../user.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  // initialize an empty user object
  // we need to do this so the property binding works [(ngModel)]
  user: User = new User();

  constructor(private userService: UserService, private router: Router) {}

  register(): void {
    this.userService.registerUser(this.user).subscribe(() => {
      // user registered, send them to the login page
      this.router.navigate(["/login"]);
    });
  }

  ngOnInit() {}
}
