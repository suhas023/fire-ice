import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import { HttpResponse } from '@angular/common/http'

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit, DoCheck {

  bookId:string;
  bookData: any;
  characterCards: any[];
  povCards: any[];
  characterLinks: string[];
  povLinks: string[]
  displayedCharacters: number;
  displayedPovCharacters: number;
  povLoaded: boolean;
  characterLoaded: boolean;

  constructor(private route: ActivatedRoute, private router: Router,
    private apiService: ApiServiceService) {
      this.reset();
  }

  ngOnInit() {
    this.route.queryParamMap
      .subscribe(data => {
        this.reset();
        this.bookId = data.get("id");
        this.apiService.getBookCard(this.bookId)
          .subscribe(data => {
            this.bookData = data;
            this.characterLinks = this.bookData.characters;
            this.povLinks = this.bookData.povCharacters;
            this.getCards('character');
            this.getCards('pov');
            if(this.characterLinks.length === 0)
              this.characterLoaded = true;
            if(this.povLinks.length === 0)
              this.povLoaded = true;
          }
        )
      }
    );
  }

  ngDoCheck() {
  }

  reset() {
    this.displayedCharacters = 0;
    this.displayedPovCharacters = 0;
    this.characterCards = [];
    this.povCards = [];
    this.povLoaded = false;
    this.characterLoaded = false;
  }

  getCards(type: string) {
    if(type === 'character') {
        if(!this.characterLoaded) {
            this.apiService.getCardsFromLinks(
                this.characterLinks.slice(this.displayedCharacters,this.displayedCharacters + 5))
            .subscribe(res => {
                for(let i = 0; i < res.length; i++) {
                    this.characterCards.push(res[i]);
                }
                this.displayedCharacters += 5;
                if(this.displayedCharacters >= this.characterLinks.length)
                    this.characterLoaded = true;
            });
          }
    } else {
            this.apiService.getCardsFromLinks(
                this.povLinks.slice(this.displayedPovCharacters,this.displayedPovCharacters + 5))
            .subscribe(res => {
                for(let i = 0; i < res.length; i++) {
                    this.povCards.push(res[i]);
                }
                this.displayedPovCharacters += 5;
                if(this.displayedPovCharacters >= this.povLinks.length)
                    this.povLoaded = true;
            });
      }
  }

}
