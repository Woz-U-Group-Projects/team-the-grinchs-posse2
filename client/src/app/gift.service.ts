import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from './user';
import { Gift } from './gift';

@Injectable({
  providedIn: 'root'
})
export class GiftService {

  constructor(private http: HttpClient) { }

  // options allows us to flag that we are using credentials, which will allow the jwt cookie on all requests
  options = { withCredentials: true };

  // base url of the express back end
  url: string = "http://localhost:3000/users/";

  getGifts(): Observable<Gift[]> {
    return this.http.get<Gift[]>(this.url + "gifts/:id", this.options);
  }
}
