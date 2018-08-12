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
  activateScroll: boolean;

  constructor(private route: ActivatedRoute, private apiService: ApiServiceService) {
    this.reset();
  }

  ngOnInit() {
    this.route.queryParamMap
      .subscribe(data => {
        window.scroll(0, 0);
        this.reset();
        this.id = data.get('id');
        console.log(this.id);
        this.apiService.getHouseCard(this.id)
          .subscribe(data =>{
            this.houseData = data;
            this.cadetBranchesLinks = this.houseData.cadetBranches;
            this.swornMembersLinks = this.houseData.swornMembers;
            this.getRelatedInfo();
        })
      });
  }

  ngDoCheck() {
    // console.log(this.displayedMembers);
    // console.log("-------------------------------");
    // console.log(this.currentLord);
    // console.log(this.heir);
    // console.log(this.overlord);
    // console.log(this.founder);
    // console.log(this.cadetBranches);
    // console.log(this.swornMembers);
    // console.log(this.swornMembersLinks);
    // console.log("-------------------------------");
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

    if(this.cadetBranchesLinks.length) {
      console.log("ASD");
      this.apiService.getCardsFromLinks(this.cadetBranchesLinks)
        .subscribe(data => data.forEach(res => this.cadetBranches.push(res)));
    }

    if(this.swornMembersLinks.length)
      this.getSwornMembers();

  }

  getSwornMembers() {
    if(this.displayedMembers <= this.swornMembersLinks.length) {
      this.displayedMembers += 4;
      this.apiService.getCardsFromLinks(this.swornMembersLinks
          .slice(this.displayedMembers - 4, this.displayedMembers))
        .subscribe(data => {
          data.forEach(res => this.swornMembers.push(res));
          if((window.innerHeight + 120 >= document.body.offsetHeight))
            this.getSwornMembers();
          else
            this.activateScroll = true;
        }
      );
    }
    else
      this.activateScroll = false;
  }

  @HostListener("window:scroll", [])
  onScroll(): void {
    if (this.activateScroll && this.bottomReached()) {
      this.getSwornMembers();
    }
  }

  bottomReached(): boolean {
    // console.log("---------------------------")
    // console.log(window.scrollY + window.innerHeight + 20);
    // console.log(window.scrollY + window.innerHeight +20>= document.body.offsetHeight);
    // console.log(document.body.offsetHeight);
    // console.log("---------------------------")

    return (window.scrollY)&&((window.innerHeight + window.scrollY + 40) >= document.body.offsetHeight);
  }

  getId(url: string) {
    return url.substr(url.lastIndexOf('/') + 1);
  }

  reset() {
    this.id = null;
    this.houseData = null;
    this.currentLord = null;
    this.heir = null;
    this.overlord = null;
    this.founder = null;
    this.cadetBranchesLinks = [];
    this.swornMembersLinks = [];
    this.cadetBranches = [];
    this.swornMembers = [];
    this.displayedMembers = 0;
    this.activateScroll = false;
  }
}
