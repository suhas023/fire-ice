import { Component, OnInit, HostListener, HostBinding, Output, EventEmitter } from '@angular/core';

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

  @Output() event: EventEmitter<string[]> = new EventEmitter();

  @HostListener('click', ["$event"])
  dropDown(e) {
  	if (e.target.nodeName === "I" || e.target.nodeName === "LI" )
  	this.showDropDown = !this.showDropDown;

    if(e.target.nodeName === "LI") {
      this.event.emit([e.target.nodeName, e.target.textContent.trim()])
    }

  }
}
