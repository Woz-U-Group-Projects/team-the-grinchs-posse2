import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Gift } from './gift';
import { GiftList } from './giftList';

@Injectable({
  providedIn: 'root'
})
export class GiftListService {

  constructor(private http: HttpClient) { }

  // options allows us to flag that we are using credentials, which will allow the jwt cookie on all requests
  options = { withCredentials: true };

  // base url of the express back end
  url: string = "http://localhost:3000/users/";

  getGiftLists(): Observable<GiftList[]> {
    return this.http.get<GiftList[]>(this.url + "giftList/:id", this.options);
  }
}
