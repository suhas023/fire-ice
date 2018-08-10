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
  allegiances: any[] = [];
  books: any[] = [];
  povBooks: any[] = [];

  constructor( private route: ActivatedRoute, private router: Router, private apiService: ApiServiceService ) {

  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(data => this.characterId = data.get('id'));
    console.log(this.characterId);
    // this.apiService.getCharacterCard(this.characterId)
    //   .subscribe(data => {
    //     this.characterData = data;
    //   }
    // );
    this.characterData = jsonData[0];
    this.getRelatedInfo();
  }

  getRelatedInfo() {
    console.log(this.characterData.father, this.characterData.allegiances, this.characterData.books, this.characterData.povBooks);
    if(this.characterData.father)
      this.apiService.getCardsFromLinks([this.characterData.father])
        .subscribe(data => this.father = data[0]);

    if(this.characterData.mother)
      this.apiService.getCardsFromLinks([this.characterData.mother])
        .subscribe(data => this.mother = data[0]);

    if(this.characterData.spouse)
      this.apiService.getCardsFromLinks([this.characterData.spouse])
        .subscribe(data => this.spouse = data[0]);

    if(this.characterData.allegiances)
      this.apiService.getCardsFromLinks(this.characterData.allegiances)
        .subscribe(data => {
          data.forEach(res => this.allegiances.push(res));
        });

    if(this.characterData.books)
      this.apiService.getCardsFromLinks(this.characterData.books)
        .subscribe(data => data.forEach(res => this.books.push(res)));

    if(this.characterData.povBooks)
      this.apiService.getCardsFromLinks(this.characterData.povBooks)
        .subscribe(data => data.forEach(res => this.povBooks.push(res)));
  }

  ngDoCheck() {
    console.log(this.characterData);
    console.log(this.povBooks);
    console.log(this.books);
    console.log(this.allegiances);
    console.log(this.father);
  }

  getId(url: string) {
    return url.substr(url.lastIndexOf('/') + 1);
  }

}

let jsonData = [
  {
    "url": "https://www.anapioficeandfire.com/api/characters/583",
    "name": "Jon Snow",
    "gender": "Male",
    "culture": "Northmen",
    "born": "In 283 AC",
    "died": "",
    "titles": [
      "Lord Commander of the Night's Watch"
    ],
    "aliases": [
      "Lord Snow",
      "Ned Stark's Bastard",
      "The Snow of Winterfell",
      "The Crow-Come-Over",
      "The 998th Lord Commander of the Night's Watch",
      "The Bastard of Winterfell",
      "The Black Bastard of the Wall",
      "Lord Crow"
    ],
    "father": "",
    "mother": "",
    "spouse": "",
    "allegiances": [
      "https://www.anapioficeandfire.com/api/houses/362"
    ],
    "books": [
      "https://www.anapioficeandfire.com/api/books/5"
    ],
    "povBooks": [
      "https://www.anapioficeandfire.com/api/books/1",
      "https://www.anapioficeandfire.com/api/books/2",
      "https://www.anapioficeandfire.com/api/books/3",
      "https://www.anapioficeandfire.com/api/books/8"
    ],
    "tvSeries": [
      "Season 1",
      "Season 2",
      "Season 3",
      "Season 4",
      "Season 5",
      "Season 6"
    ],
    "playedBy": [
      "Kit Harington"
    ]
  }
]