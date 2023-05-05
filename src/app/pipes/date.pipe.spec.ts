import { UTCDatePipe } from './date.pipe';

describe('DatePipe', () => {
  it('create an instance', () => {
    const pipe = new UTCDatePipe();
    expect(pipe).toBeTruthy();
  });
});
