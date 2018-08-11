import { Component, OnInit, DoCheck, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../api-service.service'

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.css']
})
export class HouseComponent implements OnInit, DoCheck {

  id: string;
  houseData: any;
  currentLord: any;
  heir: any;
  overlord: any;
  founder: any;
  cadetBranchesLinks: string[];
  swornMembersLinks: string[];
  cadetBranches: any[];
  swornMembers: any[];
  displayedMembers: number;

  constructor(private route: ActivatedRoute, private apiService: ApiServiceService) {
    this.cadetBranchesLinks = [];
    this.swornMembersLinks = [];
    this.cadetBranches = [];
    this.swornMembers = []
    this.displayedMembers = 0;
  }

  ngOnInit() {
    this.route.queryParamMap
      .subscribe(data => this.id = data.get('id'));

    // this.apiService.getHouseCard(this.id)
    //   .subscribe(data => this.houseData = data);

    this.houseData = jsonData;
    this.cadetBranchesLinks = jsonData.cadetBranches;
    this.swornMembersLinks = jsonData.swornMembers;

    this.getRelatedInfo();

  }

  ngDoCheck() {
    console.log("-------------------------------");
    console.log(this.currentLord);
    console.log(this.heir);
    console.log(this.overlord);
    console.log(this.founder);
    console.log(this.cadetBranches);
    console.log(this.swornMembers);
    console.log("-------------------------------");
  }

  getRelatedInfo(){
    if(this.houseData.currentLord)
      this.apiService.getCardsFromLinks([this.houseData.currentLord])
        .subscribe(data => this.currentLord = data[0]);

    if(this.houseData.heir)
      this.apiService.getCardsFromLinks([this.houseData.heir])
        .subscribe(data => this.heir = data[0]);

    if(this.houseData.overlord)
      this.apiService.getCardsFromLinks([this.houseData.overlord])
        .subscribe(data => this.overlord = data[0]);

    if(this.houseData.founder)
      this.apiService.getCardsFromLinks([this.houseData.founder])
        .subscribe(data => this.founder = data[0]);

    if(this.cadetBranchesLinks)
      this.apiService.getCardsFromLinks(this.cadetBranchesLinks)
        .subscribe(data => data.forEach(res => this.cadetBranches.push(res)));

    if(this.swornMembersLinks)
      this.getSwornMembers();

  }

  getSwornMembers() {
    if(this.displayedMembers < this.swornMembersLinks.length)
      this.apiService.getCardsFromLinks(this.swornMembersLinks
          .slice(this.displayedMembers, this.displayedMembers + 0))
        .subscribe(data => {
          data.forEach(res => this.swornMembers.push(res));
          this.displayedMembers += 0;
        }
      );
  }

  @HostListener("window:scroll", [])
  onScroll(): void {
    if (this.bottomReached()) {
      this.getSwornMembers();
    }
  }

  bottomReached(): boolean {
    return (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
  }

  getId(url: string) {
    return url.substr(url.lastIndexOf('/') + 1);
  }
}


let jsonData = {
  "url": "https://www.anapioficeandfire.com/api/houses/362",
  "name": "House Stark of Winterfell",
  "region": "The North",
  "coatOfArms": "A running grey direwolf, on an ice-white field",
  "words": "Winter is Coming",
  "titles": [
    "King in the North",
    "Lord of Winterfell",
    "Warden of the North",
    "King of the Trident"
  ],
  "seats": [
    "Scattered (formerly Winterfell)"
  ],
  "currentLord": "",
  "heir": "",
  "overlord": "https://www.anapioficeandfire.com/api/houses/16",
  "founded": "Age of Heroes",
  "founder": "https://www.anapioficeandfire.com/api/characters/209",
  "diedOut": "",
  "ancestralWeapons": [
    "Ice"
  ],
  "cadetBranches": [
    "https://www.anapioficeandfire.com/api/houses/170",
    "https://www.anapioficeandfire.com/api/houses/215"
  ],
  "swornMembers": [
    "https://www.anapioficeandfire.com/api/characters/2",
    "https://www.anapioficeandfire.com/api/characters/20",
    "https://www.anapioficeandfire.com/api/characters/97",
    "https://www.anapioficeandfire.com/api/characters/98",
    "https://www.anapioficeandfire.com/api/characters/136",
    "https://www.anapioficeandfire.com/api/characters/143",
    "https://www.anapioficeandfire.com/api/characters/148",
    "https://www.anapioficeandfire.com/api/characters/170",
    "https://www.anapioficeandfire.com/api/characters/181",
    "https://www.anapioficeandfire.com/api/characters/192",
    "https://www.anapioficeandfire.com/api/characters/206",
    "https://www.anapioficeandfire.com/api/characters/207",
    "https://www.anapioficeandfire.com/api/characters/208",
    "https://www.anapioficeandfire.com/api/characters/209",
    "https://www.anapioficeandfire.com/api/characters/210",
    "https://www.anapioficeandfire.com/api/characters/212",
    "https://www.anapioficeandfire.com/api/characters/216",
    "https://www.anapioficeandfire.com/api/characters/232",
    "https://www.anapioficeandfire.com/api/characters/259",
    "https://www.anapioficeandfire.com/api/characters/324",
    "https://www.anapioficeandfire.com/api/characters/339",
    "https://www.anapioficeandfire.com/api/characters/340",
    "https://www.anapioficeandfire.com/api/characters/349",
    "https://www.anapioficeandfire.com/api/characters/351",
    "https://www.anapioficeandfire.com/api/characters/354",
    "https://www.anapioficeandfire.com/api/characters/389",
    "https://www.anapioficeandfire.com/api/characters/461",
    "https://www.anapioficeandfire.com/api/characters/561",
    "https://www.anapioficeandfire.com/api/characters/583",
    "https://www.anapioficeandfire.com/api/characters/584",
    "https://www.anapioficeandfire.com/api/characters/589",
    "https://www.anapioficeandfire.com/api/characters/591",
    "https://www.anapioficeandfire.com/api/characters/593",
    "https://www.anapioficeandfire.com/api/characters/603",
    "https://www.anapioficeandfire.com/api/characters/648",
    "https://www.anapioficeandfire.com/api/characters/668",
    "https://www.anapioficeandfire.com/api/characters/716",
    "https://www.anapioficeandfire.com/api/characters/737",
    "https://www.anapioficeandfire.com/api/characters/777",
    "https://www.anapioficeandfire.com/api/characters/887",
    "https://www.anapioficeandfire.com/api/characters/891",
    "https://www.anapioficeandfire.com/api/characters/911",
    "https://www.anapioficeandfire.com/api/characters/912",
    "https://www.anapioficeandfire.com/api/characters/916",
    "https://www.anapioficeandfire.com/api/characters/917",
    "https://www.anapioficeandfire.com/api/characters/918",
    "https://www.anapioficeandfire.com/api/characters/957",
    "https://www.anapioficeandfire.com/api/characters/1101",
    "https://www.anapioficeandfire.com/api/characters/1111",
    "https://www.anapioficeandfire.com/api/characters/1148",
    "https://www.anapioficeandfire.com/api/characters/1158",
    "https://www.anapioficeandfire.com/api/characters/1175",
    "https://www.anapioficeandfire.com/api/characters/1185",
    "https://www.anapioficeandfire.com/api/characters/1190",
    "https://www.anapioficeandfire.com/api/characters/1254",
    "https://www.anapioficeandfire.com/api/characters/1260",
    "https://www.anapioficeandfire.com/api/characters/1326",
    "https://www.anapioficeandfire.com/api/characters/1336",
    "https://www.anapioficeandfire.com/api/characters/1383",
    "https://www.anapioficeandfire.com/api/characters/1396",
    "https://www.anapioficeandfire.com/api/characters/1407",
    "https://www.anapioficeandfire.com/api/characters/1488",
    "https://www.anapioficeandfire.com/api/characters/1489",
    "https://www.anapioficeandfire.com/api/characters/1499",
    "https://www.anapioficeandfire.com/api/characters/1515",
    "https://www.anapioficeandfire.com/api/characters/1526",
    "https://www.anapioficeandfire.com/api/characters/1565",
    "https://www.anapioficeandfire.com/api/characters/1602",
    "https://www.anapioficeandfire.com/api/characters/1620",
    "https://www.anapioficeandfire.com/api/characters/1649",
    "https://www.anapioficeandfire.com/api/characters/1650",
    "https://www.anapioficeandfire.com/api/characters/1706",
    "https://www.anapioficeandfire.com/api/characters/1737",
    "https://www.anapioficeandfire.com/api/characters/1749",
    "https://www.anapioficeandfire.com/api/characters/1787",
    "https://www.anapioficeandfire.com/api/characters/1796",
    "https://www.anapioficeandfire.com/api/characters/1816",
    "https://www.anapioficeandfire.com/api/characters/1819",
    "https://www.anapioficeandfire.com/api/characters/1843",
    "https://www.anapioficeandfire.com/api/characters/1946",
    "https://www.anapioficeandfire.com/api/characters/1950",
    "https://www.anapioficeandfire.com/api/characters/1979",
    "https://www.anapioficeandfire.com/api/characters/2019",
    "https://www.anapioficeandfire.com/api/characters/2020",
    "https://www.anapioficeandfire.com/api/characters/2037",
    "https://www.anapioficeandfire.com/api/characters/2068",
    "https://www.anapioficeandfire.com/api/characters/2089",
    "https://www.anapioficeandfire.com/api/characters/2119"
  ]
};