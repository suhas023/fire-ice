import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'fire-ice';
  constructor(x: HttpClient) {
  	// let api = "https://www.anapioficeandfire.com/api/characters?name=walder";
  	// x.get(api).subscribe((v)=> console.log(v));
  }

  ngOnInit() {
  	// console.log("hello");
  	// let y = window.innerWidth;
  	// console.log(y);
  }
}
