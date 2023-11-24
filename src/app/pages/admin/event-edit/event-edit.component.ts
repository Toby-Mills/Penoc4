import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Club } from 'src/app/models/club';
import { OEvent } from 'src/app/models/oevent.model';
import { Venue } from 'src/app/models/venue';
import { DataCacheService } from 'src/app/services/data-cache.service';
import { PenocApiService } from 'src/app/services/penoc-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit {
  public oEvent: OEvent | undefined;
  public venues: Venue[] = [];
  public clubs: Club[] = [];
  public tinyMCEKey: string = environment.tinyMCEKey;
  public tinyMCEInit = {menubar: false, plugins: 'table quickbars lists link code', toolbar: 'styles bold italic link bullist numlist quicktable indent outdent undo redo code'}
  @ViewChild('oEventForm') oEventForm: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: PenocApiService,
    private dataCache: DataCacheService,
  ) { }

  public ngOnInit() {
    this.dataCache.getVenues().subscribe(
      { next: data => this.venues = data }
    )
    this.dataCache.getClubs().subscribe(
      {
        next: data => { this.clubs = data },
        error: data => console.log('error: ', data)
      }
    )
    this.loadEvent(Number(this.route.snapshot.paramMap.get('oEventId')));
  }

  ngAfterViewInit() {

  }

  private loadEvent(oEventId: number) {
    if (oEventId > 0) {
      this.api.getOEvent(oEventId).subscribe(data => {
        this.oEvent = data;
      })
    } else {
      this.oEvent = new OEvent();
    }
    this.markFormClean();
  }

  public onSaveClick() {
    if (this.oEvent) {
      if (this.oEvent.id! > 0) {
        this.api.saveOEvent(this.oEvent).subscribe(data => {
          this.oEvent = data;
          this.loadEvent(this.oEvent.id!);
        })
      } else {
        this.api.addOEvent(this.oEvent).subscribe(data => {
          this.router.navigate(['admin/event-edit', data.id], { replaceUrl: true });
        })
      }
    }
  }

  public onCancelClick() {
    this.loadEvent(this.oEvent!.id!);
  }

  public onPlannerIdChange(event: number | undefined) {
    if (this.oEventForm) {
      this.markFormDirty();
    }
  }

  public onControllerIdChange(event: number | undefined) {
    if (this.oEventForm) {
      this.markFormDirty();
    }
  }

  public onCoursesClick() {
    this.router.navigate(['admin/event-courses-edit', this.oEvent!.id!])
  }

  private markFormClean() {
    if (this.oEventForm) {
      const form: FormControl = this.oEventForm.control;
      form.markAsPristine();
      form.markAsUntouched();
    }
  }

  private markFormDirty() {
    if (this.oEventForm) {
      const form: FormControl = this.oEventForm.control;
      form.markAsTouched();
      form.markAsDirty();
    }
  }
}
