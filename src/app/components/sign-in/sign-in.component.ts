import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PenocApiService } from 'src/app/services/penoc-api.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  public display: boolean = false;
  public failed: boolean = false;
  public username: string = '';
  public password: string = '';

  @ViewChild('usernameinput', { static: false })  private usernameElement!: ElementRef<HTMLElement>;

  constructor(
    private api: PenocApiService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  public showDialog(display: boolean) {
    this.display = display;
    setTimeout(()=>{this.usernameElement.nativeElement.focus()},1)    
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
        next: success => this.display = false,
        error: error => this.failed = true
      }
    )
  }

  public onCancelClick() {
    this.router.navigate(['/home'])
  }
}
