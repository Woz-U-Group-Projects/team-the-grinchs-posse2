import { Component, OnInit } from '@angular/core';

import { GiftListService } from '../gift-list.service';
import { GiftList } from '../giftList';

@Component({
  selector: 'app-gift-list',
  templateUrl: './gift-list.component.html',
  styleUrls: ['./gift-list.component.css']
})
export class GiftListComponent implements OnInit {

  giftLists: GiftList[] = [];

  constructor(private giftListService: GiftListService) { }

  ngOnInit() {
    this.giftListService.getGiftLists().subscribe(GiftList => {
      console.log(GiftList);
      this.giftLists = GiftList;
    });
  }

}
