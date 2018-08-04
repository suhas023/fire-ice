import { Component, OnInit, HostListener } from '@angular/core';
import { ApiServiceService } from './api-service.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  allCards: any;
  bookCards: any;
  characterCards: any;
  houseCards: any;
  selectedCards: any;

  constructor(private apiService: ApiServiceService ) {

  }

  ngOnInit() {
    // this.apiService.getCards().subscribe(
    //   data => {
    //     this.bookCards = data[0];
    //     this.characterCards = data[1];
    //     this.houseCards = data[2];

    //     this.allCards = [...this.bookCards, ...this.characterCards, ...this.houseCards];
    //     console.log(this.allCards);
    //     this.selectedCards = this.allCards;
    //   }
    // )
  }

  changeList(e) {
    console.log(e[1]);
  }
}
