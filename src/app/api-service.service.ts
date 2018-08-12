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


  getBookCard(id: string) {
    return this.http.get(this.apiUrl + "books/" + id);
  }

  getCharacterCard(id: string) {
    return this.http.get(this.apiUrl + "characters/" + id);
  }

  getHouseCard(id: string) {
    return this.http.get(this.apiUrl + "houses/" + id);
  }

  getCards() {
    return forkJoin (
      this.http.get(this.apiUrl + "books"),
      this.http.get(this.apiUrl + "characters"),
      this.http.get(this.apiUrl + "houses")
    );
  }

  getCardsFromLinks(links:string[]) {
    let httpObservables = [];
    for(let i = 0; i < links.length; i++) {
      httpObservables.push(this.http.get(links[i]));
    }

    return forkJoin(...httpObservables);
  }

  getPages(category: string, page: number) {
    return this.http.get(`${this.apiUrl}${category}?pageSize=24&page=${page}`);
  }

  getSearchedCard(name: string) {
    return forkJoin(
      this.http.get(this.apiUrl + "books?name=" + name),
      this.http.get(this.apiUrl + "characters?name=" + name),
      this.http.get(this.apiUrl + "houses?name=" + name)
    );
  }

}
