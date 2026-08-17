
import { describe, it, expect } from 'vitest';

describe('Prayer Times', () => {
  it('calculates next prayer from current time', () => {
    const times = ['04:33', '11:26', '14:48', '17:18', '18:20'];
    const current = '12:00';
    const next = times.find(t => t > current);
    expect(next).toBe('14:48');
  });
  it('handles end of day correctly', () => {
    const times = ['04:33', '11:26', '14:48', '17:18', '18:20'];
    const current = '23:00';
    const next = times.find(t => t > current) || times[0];
    expect(next).toBe('04:33');
  });
});
