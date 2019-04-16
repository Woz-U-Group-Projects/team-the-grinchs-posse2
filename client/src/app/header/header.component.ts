import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { UserService } from "../user.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

  logout() {
    this.userService.logout().subscribe(response => {
      this.userService.loggedIn = false;
      console.log("logging out");
      this.router.navigate(["/home"]);
    });
    return false;
  }

  ngOnInit() {}
}
