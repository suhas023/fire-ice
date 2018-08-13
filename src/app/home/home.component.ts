import { Component, OnInit, HostListener } from '@angular/core';
import { ApiServiceService } from '../api-service.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  allCards: any;
  bookCards: any;
  characterCards: any;
  houseCards: any;
  selectedCards: any;

  constructor(private apiService: ApiServiceService ) {
  }

  ngOnInit() {
    this.apiService.getCards().subscribe(
      data => {
        this.bookCards = data[0];
        this.characterCards = data[1];
        this.houseCards = data[2];

        this.allCards = [...this.bookCards, ...this.characterCards, ...this.houseCards];
        this.selectedCards = this.allCards.sort(this.sortFunction);
      }
    )
  }

  sortFunction(a, b) {
    let x = a.name?a.name.toLowerCase():'common character';
    let y = b.name?b.name.toLowerCase():'common character';

    return x < y? -1: 1;
  }

}
