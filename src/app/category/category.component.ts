import { Component, OnInit } from '@angular/core';
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
        this.getSearchCard();
    });
  }

  getCategoryCards() {
    if(!this.stopLoading) {
      this.apiService.getPages(this.show, this.page)
        .subscribe((data:any[]) => {
          if(data.length) {
            data.forEach(res => this.categoryCards.push(res));
            if(!this.activateScroll)
              this.activateScroll = true;
            this.page += 1;
          } else {
            this.activateScroll = false;
            this.stopLoading = true;
          }
        });
    }
  }

  reset() {
    this.activateScroll = false;
    this.show = "";
    this.search = "";
    this.page = 0;
    this.categoryCards = [];
    this.stopLoading = false;
  }
}
