import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { UserService } from "../user.service";
import { User } from "../user";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  user: User = new User();
  constructor(private userService: UserService, private router: Router) {}

  login(): void {
    this.userService.loginUser(this.user).subscribe(() => {
      this.userService.getProfile().subscribe(() => {
        // set the user to logged in
        this.userService.loggedIn = true;
        // send to the profile page
        this.router.navigate(["/profile"]);
      });
    });
  }

  ngOnInit() {}
}
