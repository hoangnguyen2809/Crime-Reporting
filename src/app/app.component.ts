import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'crime-reporting';
  currentRoute!: string;
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((val) => {
      this.currentRoute = this.router.url;
    });
  }
}
