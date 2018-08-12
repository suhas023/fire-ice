import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  show: string;
  activateScroll: boolean;
  search: string;
  page: number;
  categoryCards: any[];
  stopLoading: boolean;
  constructor(private route: ActivatedRoute, private apiService: ApiServiceService) {
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(data => {
      this.reset();
      this.show = data.get("show");
      this.search = data.get("search");
      if(this.show)
        this.getCategoryCards();
      else if (this.search)
        this.getSearchedCard();
    });
  }

  getCategoryCards() {
    if(!this.stopLoading) {
      this.page += 1;
      this.apiService.getPages(this.show, this.page)
        .subscribe((data:any[]) => {
          if(data.length) {
            data.forEach(res => this.categoryCards.push(res));
            if(!this.activateScroll) {
              if((window.innerHeight + 120 >= document.body.offsetHeight))
                this.getCategoryCards();
              else
                this.activateScroll = true;
            }
          } else {
            this.activateScroll = false;
            this.stopLoading = true;
          }
        });
    }
  }

  getSearchedCard() {
    this.apiService.getSearchedCard(this.search)
      .subscribe((data:any[]) => {
        for(let i = 0; i < data.length; i++)
          if(data[i].length)
            this.categoryCards = data[i];
      });
  }

  reset() {
    this.activateScroll = false;
    this.show = "";
    this.search = "";
    this.page = 0;
    this.categoryCards = [];
    this.stopLoading = false;
  }

    @HostListener("window:scroll", [])
  onScroll(): void {
    console.log("scroll");
    if (this.activateScroll && this.bottomReached()) {
      this.getCategoryCards();
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
}
