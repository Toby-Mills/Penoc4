import { SortOeventsByDatePipe } from './sort-oevents-by-date.pipe';

describe('SortOeventsByDatePipe', () => {
  it('create an instance', () => {
    const pipe = new SortOeventsByDatePipe();
    expect(pipe).toBeTruthy();
  });
});
