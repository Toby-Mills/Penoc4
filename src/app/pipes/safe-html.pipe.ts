import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {
  }

  transform(value?: string): string | undefined {
    if (value) {
      return this.sanitizer.bypassSecurityTrustHtml(value) as string;
    }
    return undefined;
  }

}
