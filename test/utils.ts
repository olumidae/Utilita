import { isPeakHour, getRate } from '../app/utility/utils';

describe('Utility functions:', () => {

  it('returns true for peak hours', () => {
    const result = isPeakHour(new Date('2023-01-01T08:00:00'));
    expect(result).toBe(true); 
  });

  it('returns off peak rate', () => {
    const rate = {peakRate: 1, offPeakRate: 0.5};
    const result = getRate(new Date('2023-01-01T05:00:00'), rate);
    expect(result).toBe(0.5);
  });

});



