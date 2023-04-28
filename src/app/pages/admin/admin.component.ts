import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SignInComponent } from 'src/app/components/sign-in/sign-in.component';
import { PenocApiService } from 'src/app/services/penoc-api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public authenticated: boolean = false;
  @ViewChild(SignInComponent) signIn!: SignInComponent;
  public constructor(
    private api: PenocApiService,
    private changeDetector: ChangeDetectorRef,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.authenticated = this.api.isAuthenticated();
  }

  ngAfterViewInit() {
    if (this.authenticated == false) {
      this.signIn.showDialog(true);
      this.changeDetector.detectChanges();
    }
  }

  public onSignOutClick() {
    this.api.signOut();
    this.router.navigate(['/home']);
  }
}
