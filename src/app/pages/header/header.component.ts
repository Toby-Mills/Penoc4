import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PenocApiService } from 'src/app/services/penoc-api.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() eventClick = new EventEmitter<number>();
  public nextEventClicked(oeventId:number) {
    this.router.navigate([`event-notice`,oeventId]);
  }
  constructor(private router:Router, public api:PenocApiService) { }

  ngOnInit(): void {
  }

}
