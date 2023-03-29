import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ResultsComponent } from './pages/results/results.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { EventNoticeComponent } from './pages/event-notice/event-notice.component';

const routes: Routes = [
  {path:'', redirectTo: '/home', pathMatch: 'full'},
  {path:'home', component: HomeComponent },
  {path:'results', component: ResultsComponent },
  {path:'contact-us', component: ContactUsComponent },
  {path:'event-notice', component: EventNoticeComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
