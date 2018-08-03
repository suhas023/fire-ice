import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  apiUrl: string;

  constructor() {
  	this.apiUrl = "https://www.anapioficeandfire.com/api/";
  }

}
