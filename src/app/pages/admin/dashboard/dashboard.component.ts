import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OEvent } from 'src/app/models/oevent.model';
import { PenocApiService } from 'src/app/services/penoc-api.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  public upcomingOEvents: OEvent[] = [];
  public recentOEvents: OEvent[] = [];

  public constructor(
    private api: PenocApiService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const today = new Date();
    let sixMonthsAgo: Date;
    let sixMonthsAhead: Date;

    sixMonthsAgo = new Date(today.setMonth(today.getMonth() - 6));
    sixMonthsAhead = new Date(today.setMonth(today.getMonth() + 6));

    this.api.getOEvents(undefined, undefined,today).subscribe(data => this.upcomingOEvents = data);
    this.api.getOEvents(undefined, undefined,sixMonthsAgo,today).subscribe(data => this.recentOEvents = data);
  }

  public onSignOutClick() {
    this.api.signOut();
    this.router.navigate(['/home']);
  }

  public onUpcomingEventClick(oEventId: number) {
    this.router.navigate(['/admin/event-edit', oEventId]);
  }
}
