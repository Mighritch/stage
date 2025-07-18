import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <nav>
      <a routerLink="/personnels">Personnel</a> |
      <a routerLink="/services">Services</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: [`
    nav {
      padding: 16px;
      background-color: #f8f8f8;
    }
    a {
      margin-right: 10px;
    }
  `]
})
export class AppComponent {
  title = 'front';
}
