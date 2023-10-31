import { Component, OnInit } from '@angular/core';
import { Competitor } from 'src/app/models/competitor';
import { DataCacheService } from 'src/app/services/data-cache.service';

@Component({
  selector: 'app-competitors',
  templateUrl: './competitors.component.html',
  styleUrls: ['./competitors.component.css']
})
export class CompetitorsComponent implements OnInit {
  public competitors: Competitor[] = [];

  public constructor(
    private dataService: DataCacheService,
  ) { }

  ngOnInit(): void {
    this.dataService.getAllCompetitors().subscribe((competitors) => {
      this.competitors = competitors;
    })
  }
}
