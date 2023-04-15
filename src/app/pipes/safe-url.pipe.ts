import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safeUrl'
})
export class SafeUrlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {
  }

  transform(value?: string): SafeUrl {
    if (!value) {
      value = '';
    }
    return this.sanitizer.bypassSecurityTrustUrl(value) as string;
  }

}
