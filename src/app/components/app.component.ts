import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from 'src/environments/environment';

declare const gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'penoc';

  constructor(private router: Router) {
    if (environment.production) {
      gtag('js', new Date());
      gtag('config', environment.gaTrackingId);
    }
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        document.documentElement.scrollTop = 0;
      }
    })
  }

}
