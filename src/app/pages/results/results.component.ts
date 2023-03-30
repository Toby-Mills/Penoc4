import { sanitizeIdentifier } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { OEventResults } from 'src/app/models/oevent-results';
import { PenocApiService } from 'src/app/services/penoc-api.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  public oEventResults: Array<OEventResults> = [];
  private startOfDateRange: Date = new Date();

  constructor(private api: PenocApiService) { }

  ngOnInit(): void {
    this.addMoreEvents(10)
  }

  private addMoreEvents(targetEventCount: number) {
    const oldCount = this.oEventResults.length
    if (this.oEventResults.length < targetEventCount) {
      let toDate = this.startOfDateRange;
      toDate = new Date(toDate.setDate(toDate.getDate() - 1));
      let fromDate = new Date(toDate);
      fromDate = new Date(fromDate.setMonth(fromDate.getMonth() - 6));
      this.api.getOEventResultSummaries(undefined, undefined, fromDate, toDate, 1).subscribe((data) => {
        this.oEventResults = this.oEventResults.concat(data);
        let newCount = this.oEventResults.length;
        this.startOfDateRange = fromDate;
        if(newCount > oldCount){
          this.addMoreEvents(targetEventCount); 
        }
      });
    }
  }

  public onVisible(event:any){
    this.addMoreEvents(this.oEventResults.length + 10);
  }
}
