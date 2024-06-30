import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'comparador-de-coches';
  username: string = '';

  constructor(private cookieService: CookieService) {}

  ngOnInit(): void {
    this.username = this.cookieService.get('username') || 'Usuario';
  }
}

