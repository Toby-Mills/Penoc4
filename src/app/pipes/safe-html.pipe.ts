import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {
  }

  transform(value?: string): SafeHtml {
    if (!value) {
      value = '';
    }
    return this.sanitizer.bypassSecurityTrustHtml(value) as string;
  }

}
