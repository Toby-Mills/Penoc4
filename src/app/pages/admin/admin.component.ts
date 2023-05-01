import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PenocApiService } from 'src/app/services/penoc-api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public authenticated: boolean = false;
  public constructor(
    private api: PenocApiService,
    private changeDetector: ChangeDetectorRef,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.authenticated = this.api.isAuthenticated();
  }

  public onSignOutClick() {
    this.api.signOut();
    this.router.navigate(['/home']);
  }
}
