import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-what-is-orienteering',
  templateUrl: './what-is-orienteering.component.html',
  styleUrls: ['./what-is-orienteering.component.css']
})
export class WhatIsOrienteeringComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('PenOC | What is Orienteering?');
  }

}
