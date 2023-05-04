import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PenocApiService } from 'src/app/services/penoc-api.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  public failed: boolean = false;
  public username: string = '';
  public password: string = '';

  @Output()
  public signedIn:EventEmitter<boolean> = new EventEmitter();

  @ViewChild('usernameinput', { static: false })
  private usernameElement!: ElementRef<HTMLElement>;

  constructor(
    private api: PenocApiService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  public onBackgroundClick() {
    this.router.navigate(['/home']);
  }

  public onDialogClick(event: MouseEvent) {
    event.stopPropagation();
  }

  public onEnterKey(event: any) {
    this.signIn()
  }

  public onSignInClick() {
    this.signIn()
  }

  private signIn() {
    this.api.signIn(this.username, this.password).subscribe(
      {
        next: success => {this.router.navigate(['/admin'])},
        error: error => this.failed = true
      }
    )
  }

  public onCancelClick() {
    this.router.navigate(['/home'])
  }
}
