import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  showDropDown: boolean;
  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  searchCard(name: HTMLInputElement, event: Event) {
    console.log(name.value);
    if(name.value) {
      this.router.navigate(["/category"], {queryParams:{'search': name.value.trim()}});
    }
    event.preventDefault();
  }

  @HostListener('click', ["$event"])
  dropDown(e) {
  	if (e.target.nodeName === "I" || (e.target.className === "bars") || e.target.nodeName === "A" )
  	this.showDropDown = !this.showDropDown;
  }
}
