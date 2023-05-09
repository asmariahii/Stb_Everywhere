import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  navActive = false;

  constructor() {}

  ngOnInit(): void {}

  toggleNav(): void {
    this.navActive = !this.navActive;
  }
}

