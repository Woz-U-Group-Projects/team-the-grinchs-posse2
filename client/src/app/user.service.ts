import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "./user";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient) {}

  // options allows us to flag that we are using credentials, which will allow the jwt cookie on all requests
  options = { withCredentials: true };

  // base url of the express back end
  url: string = "http://localhost:3000/users/";

  // boolean value to hold the login status
  loggedIn: boolean = false;

  // register a user, must .subscribe() to trigger POST baseurl/signup
  registerUser(user: User): Observable<string> {
    return this.http.post<string>(this.url + "signup", user, this.options);
  }

  // login a user, must .subscribe() to trigger POST baseurl/login
  loginUser(user: User): Observable<string> {
    return this.http.post<string>(this.url + "login", user, this.options);
  }

  // get a user profile, must .subscribe() to trigger GET baseurl/profile
  getProfile(): Observable<User> {
    return this.http.get<User>(this.url + "profile", this.options);
  }

  // logout, must .subscribe() to trigger GET baseurl/logout
  logout(): Observable<string> {
    return this.http.get<string>(this.url + "logout", this.options);
  }

  // validate a token, must .subscribe() to trigger GET baseurl/validateToken
  validateToken(): Observable<boolean> {
    return this.http.get<boolean>(this.url + "validateToken", this.options);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url + "users", this.options);
  }
}
