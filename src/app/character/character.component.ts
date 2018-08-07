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

    this.characterData = jsonData;
  }

  ngDoCheck() {
    console.log(this.characterData);
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