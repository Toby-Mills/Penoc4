import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ResultsComponent } from './pages/results/results.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { EventNoticeComponent } from './pages/event-notice/event-notice.component';
import { EventResultsComponent } from './pages/event-results/event-results.component';
import { WhatIsOrienteeringComponent } from './pages/what-is-orienteering/what-is-orienteering.component';
import { IndividualResultsComponent } from './pages/individual-results/individual-results.component';
import { AdminDashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { AdminGuard } from './guards/admin-guard';
import { EventEditComponent } from './pages/admin/event-edit/event-edit.component';
import { EventCoursesEditComponent } from './pages/admin/event-courses-edit/event-courses-edit.component';
import { CourseResultsEditComponent } from './pages/admin/course-results-edit/course-results-edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'what-is-orienteering', component: WhatIsOrienteeringComponent },
  { path: 'results', component: ResultsComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'event-notice/:oEventId', component: EventNoticeComponent },
  { path: 'event-results/:oEventId', component: EventResultsComponent },
  { path: 'individual-results/:competitorId', component: IndividualResultsComponent },
  { path: 'sign-in', component: SignInComponent },
  {
    path: 'admin',
    canActivate: [AdminGuard],
    children: [
      { path: 'event-edit', component: EventEditComponent },
      { path: 'event-edit/:oEventId', component: EventEditComponent },
      { path: 'event-courses-edit/:oEventId', component: EventCoursesEditComponent  },
      { path: 'course-results-edit/:courseId', component: CourseResultsEditComponent  },
      
      { path: '', component: AdminDashboardComponent  },
    ]
  },
  { path: '**', redirectTo:'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
