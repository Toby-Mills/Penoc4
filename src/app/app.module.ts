import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './components/app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './pages/header/header.component';
import { ResultsComponent } from './pages/results/results.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { WhatsAppComponent } from './components/whats-app/whats-app.component';
import { PenocApiService } from './services/penoc-api.service';
import { ResultListComponent } from './components/result-list/result-list.component';
import { CourseResultsComponent } from './components/course-results/course-results.component';
import { OEventSummaryComponent } from './components/oevent-summary/oevent-summary.component';
import { UpcomingOeventsComponent } from './components/upcoming-oevents/upcoming-oevents.component';
import { TimePipe } from './pipes/time.pipe';
import { DatePipe } from './pipes/date.pipe';
import { SortOEventResultsByDatePipe } from './pipes/sort-oevent-results-by-date.pipe';
import { ScrollIntoViewDirective } from './directives/is-visible.directive';
import { NextEventComponent } from './components/next-event/next-event.component';
import { EventNoticeComponent } from './pages/event-notice/event-notice.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { EventResultsComponent } from './pages/event-results/event-results.component';
import { OeventResultsComponent } from './components/oevent-results/oevent-results.component';
import { WhatIsOrienteeringComponent } from './pages/what-is-orienteering/what-is-orienteering.component';
import IndividualResultsComponent from './pages/individual-results/individual-results.component';
import { SortResultsByDatePipe } from './pipes/sort-results-by-date.pipe';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    ResultsComponent,
    ContactUsComponent,
    WhatsAppComponent,
    ResultListComponent,
    CourseResultsComponent,
    OEventSummaryComponent,
    TimePipe,
    DatePipe,
    SortOEventResultsByDatePipe,
    ScrollIntoViewDirective,
    UpcomingOeventsComponent,
    NextEventComponent,
    EventNoticeComponent,
    SafeHtmlPipe,
    SafeUrlPipe,
    EventResultsComponent,
    OeventResultsComponent,
    WhatIsOrienteeringComponent,
    IndividualResultsComponent,
    SortResultsByDatePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [PenocApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
