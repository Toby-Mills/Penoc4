import { Injectable } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ToastMessageType, ToasterComponent } from '../components/toaster/toaster.component';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private overlay: Overlay) { }

  showToast(message: string, messageType: ToastMessageType, durationMS: number) {
    const overlayRef = this.overlay.create();
    const portal = new ComponentPortal(ToasterComponent);
    const componentRef = overlayRef.attach(portal);
    componentRef.instance.message = message;
    componentRef.instance.messageType = messageType;
    componentRef.instance.dismiss.subscribe(()=> overlayRef.dispose())

    // Automatically close the toast after specified duration
    if (durationMS > 0){
          setTimeout(() => {
      overlayRef.dispose();
    }, durationMS);
    }

  }

}
