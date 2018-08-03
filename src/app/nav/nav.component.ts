import { Component, OnInit, HostListener, HostBinding } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  showDropDown: boolean;
  constructor() {
  }

  ngOnInit() {
  }

  @HostListener('click', ["$event"])
  dropDown(e) {
  	if (e.target.nodeName === "I" || e.target.nodeName === "LI")
  	this.showDropDown = !this.showDropDown;
  }
}
