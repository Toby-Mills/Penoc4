import { Component, Output, EventEmitter, OnInit, ViewChild, APP_ID } from '@angular/core';
import { PenocApiService } from 'src/app/services/penoc-api.service';
import { WhatsAppComponent } from '../../components/whats-app/whats-app.component';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { OEvent } from 'src/app/models/oevent.model';
import { DataCacheService } from 'src/app/services/data-cache.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private upcomingOEvents: OEvent[] = [];
  
  @ViewChild(WhatsAppComponent) public whatsApp!: WhatsAppComponent;
  constructor(
    private api: PenocApiService, 
    private router: Router, 
    private titleService: Title,
    public dataCache: DataCacheService
    ) { }

  ngOnInit(): void {
    this.titleService.setTitle('PenOC | Home');
    this.dataCache.loadUpcomingOEvents()
  }

  public showWhatsApp(display: boolean) {
    this.whatsApp.showDialog(display);
  }

  public onUpcomingEventClicked(oeventId: number) {
    this.router.navigate(['event-notice', oeventId]);
  }

  public onReadMoreClick() {
    this.router.navigate(['what-is-orienteering']);
  }
}
