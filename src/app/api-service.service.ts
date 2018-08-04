import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { forkJoin } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = "https://www.anapioficeandfire.com/api/";
  }


  getBookCard(name: string) {
    return this.http.get(this.apiUrl + "books?name=" + name);
  }

  getCharacterCard(name: string) {
    return this.http.get(this.apiUrl + "characters?name=" + name);
  }

  getHouseCard(name: string) {
    return this.http.get(this.apiUrl + "house?name=" + name);
  }

  getCards() {
    return forkJoin (
      this.http.get(this.apiUrl + "books"),
      this.http.get(this.apiUrl + "characters"),
      this.http.get(this.apiUrl + "houses")
    );
  }
}
