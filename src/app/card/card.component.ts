import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() card;
  cardType: string;
  id: string;

  constructor() {
  }

  ngOnInit() {
    this.findCardType();
    console.log(this.cardType);
  }


  findCardType() {
    if(this.card.url.includes("books"))
      this.cardType = "book";

    else if(this.card.url.includes("characters"))
      this.cardType = "character";

    else
      this.cardType = "house"

    this.id = this.getID(this.card.url);
  }

  getID(url) {
    return url.substr(url.lastIndexOf('/') + 1);
  }


}
