import { Component, Output, EventEmitter, OnInit, ViewChild, APP_ID } from '@angular/core';
import { PenocApiService } from 'src/app/services/penoc-api.service';
import { WhatsAppComponent } from '../../components/whats-app/whats-app.component';
import { OEvent } from 'src/app/models/oevent.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

public display:boolean = false;
@ViewChild(WhatsAppComponent) public whatsApp!:WhatsAppComponent;
  constructor(private api:PenocApiService) { }

  ngOnInit(): void {

  }

  public showWhatsApp(display: boolean){
    this.whatsApp.showDialog(display);
  }
}
