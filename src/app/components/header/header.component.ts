import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  showMobileNavMenu = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleMobileNavMenu() {
    this.showMobileNavMenu = !this.showMobileNavMenu;
  }

}
