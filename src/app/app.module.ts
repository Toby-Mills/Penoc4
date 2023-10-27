import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { UpcomingOeventsComponent } from './components/oevent-list/oevent-list.component';
import { TimePipe } from './pipes/time.pipe';
import { UTCDatePipe } from './pipes/date.pipe';
import { SortOEventResultsByDatePipe } from './pipes/sort-oevent-results-by-date.pipe';
import { ScrollIntoViewDirective } from './directives/is-visible.directive';
import { NextEventComponent } from './components/next-event/next-event.component';
import { EventNoticeComponent } from './pages/event-notice/event-notice.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { EventResultsComponent } from './pages/event-results/event-results.component';
import { OeventResultsComponent } from './components/oevent-results/oevent-results.component';
import { WhatIsOrienteeringComponent } from './pages/what-is-orienteering/what-is-orienteering.component';
import { IndividualResultsComponent } from './pages/individual-results/individual-results.component';
import { SortResultsByDatePipe } from './pipes/sort-results-by-date.pipe';
import { AdminDashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { FormsModule } from '@angular/forms';
import { EventEditComponent } from './pages/admin/event-edit/event-edit.component';
import { UTCDateSerializer } from './interceptors/utc-date-serializer';
import { CompetitorSelectorComponent } from './components/competitor-selector/competitor-selector.component';
import { SortCompetitorsIndividualsFirstPipe } from './pipes/sort-competitors-individuals-first.pipe';
import { EventCoursesEditComponent } from './pages/admin/event-courses-edit/event-courses-edit.component';
import { CourseResultsEditComponent } from './pages/admin/course-results-edit/course-results-edit.component';
import { InputTimeComponent } from './components/input-time/input-time.component';
import { SortOeventsByDatePipe } from './pipes/sort-oevents-by-date.pipe';
import { AddCompetitorComponent } from './components/add-competitor/add-competitor.component';
import { DialogModule } from '@angular/cdk/dialog';
import { ToasterComponent } from './components/toaster/toaster.component';
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
    UTCDatePipe,
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
    AdminDashboardComponent,
    SignInComponent,
    EventEditComponent,
    CompetitorSelectorComponent,
    SortCompetitorsIndividualsFirstPipe,
    EventCoursesEditComponent,
    CourseResultsEditComponent,
    InputTimeComponent,
    SortOeventsByDatePipe,
    AddCompetitorComponent,
    ToasterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DragDropModule,
    DialogModule,
  ],
  providers: [
    PenocApiService,
    { provide: HTTP_INTERCEPTORS, useClass: UTCDateSerializer, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
