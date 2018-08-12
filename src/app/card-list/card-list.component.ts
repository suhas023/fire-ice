import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit, OnChanges {

  @Input() cards;

  constructor() {
  }

  ngOnInit() {

  }

  ngOnChanges() {
    // console.log(this.cards);
  }

}
