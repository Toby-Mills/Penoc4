import { TestBed } from '@angular/core/testing';
import { SafeUrlPipe } from './safe-url.pipe';

describe('SafeUrlPipe', () => {
  it('create an instance', () => {
    const pipe = TestBed.createComponent(SafeUrlPipe);
    expect(pipe).toBeTruthy();
  });
});
