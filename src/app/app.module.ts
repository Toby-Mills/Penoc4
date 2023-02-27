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
import { SortEventDatePipe } from './pipes/sort-event-date.pipe';
import { ScrollIntoViewDirective } from './directives/is-visible.directive';
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
    SortEventDatePipe,
    ScrollIntoViewDirective,
    UpcomingOeventsComponent,
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
