import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit, DoCheck {
  characterData: any;
  characterId: string;
  father: any;
  mother: any;
  spouse: any;
  allegiances: any[];
  books: any[];
  povBooks: any[];

  constructor( private route: ActivatedRoute, private router: Router, private apiService: ApiServiceService ) {
    this.reset();
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(data =>{
      this.reset();
      this.characterId = data.get('id');
      this.apiService.getCharacterCard(this.characterId)
        .subscribe(data => {
          this.characterData = data;
          this.getRelatedInfo();
        }
      );
    });
  }

  getRelatedInfo() {
    if(this.characterData.father)
      this.apiService.getCardsFromLinks([this.characterData.father])
        .subscribe(data => this.father = data[0]);

    if(this.characterData.mother)
      this.apiService.getCardsFromLinks([this.characterData.mother])
        .subscribe(data => this.mother = data[0]);

    if(this.characterData.spouse)
      this.apiService.getCardsFromLinks([this.characterData.spouse])
        .subscribe(data => this.spouse = data[0]);

    if(this.characterData.allegiances.length)
      this.apiService.getCardsFromLinks(this.characterData.allegiances)
        .subscribe(data => {
          data.forEach(res => this.allegiances.push(res));
        });

    if(this.characterData.books.length)
      this.apiService.getCardsFromLinks(this.characterData.books)
        .subscribe(data => data.forEach(res => this.books.push(res)));

    if(this.characterData.povBooks.length)
      this.apiService.getCardsFromLinks(this.characterData.povBooks)
        .subscribe(data => data.forEach(res => this.povBooks.push(res)));
  }

  reset () {
    this.characterData = null;
    this.characterId = null;
    this.father = null;
    this.mother = null;
    this.spouse = null
    this.allegiances = [];
    this.books = [];
    this.povBooks = [];
  }
  ngDoCheck() {
    // console.log(this.characterData);
    // console.log(this.povBooks);
    // console.log(this.books);
    // console.log(this.allegiances);
    // console.log(this.father);
  }

  getId(url: string) {
    return url.substr(url.lastIndexOf('/') + 1);
  }

}
