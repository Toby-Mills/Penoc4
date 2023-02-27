import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-whats-app',
  templateUrl: './whats-app.component.html',
  styleUrls: ['./whats-app.component.css']
})
export class WhatsAppComponent implements OnInit {
public display:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  public showDialog(display:boolean){
    this.display = display;
  }
}
