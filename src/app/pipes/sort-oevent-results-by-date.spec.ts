import { SortOEventResultsByDatePipe } from './sort-oevent-results-by-date.pipe';

describe('SortEventDatePipe', () => {
  it('create an instance', () => {
    const pipe = new SortOEventResultsByDatePipe();
    expect(pipe).toBeTruthy();
  });
});
