import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.css']
})
export class ToasterComponent {
  @Output() dismiss: EventEmitter<void> = new EventEmitter();
  message: string = '';
  messageType: ToastMessageType = ToastMessageType.Information;

  get toastClass() {
    // Apply different CSS classes based on messageType
    switch (this.messageType) {
      case ToastMessageType.Information:
        return 'toast-information';
      case ToastMessageType.Success:
        return 'toast-success';
      case ToastMessageType.Warning:
        return 'toast-warning';
      case ToastMessageType.Failure:
        return 'toast-failure';
      default:
        return 'toast-information';
    }
  }

  public onCloseClick() {
    this.dismiss.emit();
  }

}

export enum ToastMessageType {
  Information,
  Success,
  Warning,
  Failure,
}

