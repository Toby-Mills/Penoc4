import { TestBed } from '@angular/core/testing';
import { SafeHtmlPipe } from './safe-html.pipe';

describe('SafeHtmlPipe', () => {
  it('create an instance', () => {
    const pipe = TestBed.createComponent(SafeHtmlPipe);
    expect(pipe).toBeTruthy();
  });
});
