import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Club } from 'src/app/models/club';
import { OEvent } from 'src/app/models/oevent.model';
import { Venue } from 'src/app/models/venue';
import { DataCacheService } from 'src/app/services/data-cache.service';
import { PenocApiService } from 'src/app/services/penoc-api.service';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit {
  public oEvent: OEvent | undefined;
  public venues: Venue[] = [];
  public clubs: Club[] = [];
  @ViewChild('oEventForm') oeventForm: any;

  constructor(
    private route: ActivatedRoute,
    private api: PenocApiService,
    private dataCache: DataCacheService,
  ) { }

  public ngOnInit() {
    this.dataCache.getVenues().subscribe(
      { next: data => this.venues = data }
    )
    this.dataCache.getClubs().subscribe(
      { next: data => {this.clubs = data},
      error: data => console.log('error: ', data) }
    )
    this.loadEvent(Number(this.route.snapshot.paramMap.get('oEventId')));
  }

  ngAfterViewInit() {

  }

  private loadEvent(oEventId: number) {
    this.api.getOEvent(oEventId).subscribe(data => {
      this.oEvent = data;
    });
  }

  public onSaveClick() {
    if (this.oEvent) {
      this.api.saveOEvent(this.oEvent).subscribe(data => this.oEvent = data);
      const form:FormControl = this.oeventForm.control;
      form.markAsPristine();
      form.markAsUntouched();
    }
  }

  public onPlannerIdChange(event:number | undefined){
    const form:FormControl = this.oeventForm.control;
    form.markAsTouched();
    form.markAsDirty();
  }

  public onControllerIdChange(event:number | undefined){
    const form:FormControl = this.oeventForm.control;
    form.markAsTouched();
    form.markAsDirty();
  }
}
