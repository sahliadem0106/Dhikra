
import { describe, it, expect } from 'vitest';

describe('Qibla Calculation', () => {
  it('Sampang Indonesia to Mecca is ~294 degrees', () => {
    const lat = -7.0, lng = 113.0;
    const meccaLat = 21.4225 * Math.PI / 180;
    const meccaLng = 39.8262 * Math.PI / 180;
    const userLat = lat * Math.PI / 180;
    const userLng = lng * Math.PI / 180;
    const dLng = meccaLng - userLng;
    const y = Math.sin(dLng);
    const x = Math.cos(userLat) * Math.tan(meccaLat) - Math.sin(userLat) * Math.cos(dLng);
    let bearing = Math.atan2(y, x) * 180 / Math.PI;
    bearing = (bearing + 360) % 360;
    expect(bearing).toBeGreaterThan(290);
    expect(bearing).toBeLessThan(300);
  });

  it('Mecca bearing to itself is 0', () => {
    const lat = 21.4225, lng = 39.8262;
    const meccaLat = 21.4225 * Math.PI / 180;
    const meccaLng = 39.8262 * Math.PI / 180;
    const userLat = lat * Math.PI / 180;
    const userLng = lng * Math.PI / 180;
    const dLng = meccaLng - userLng;
    const y = Math.sin(dLng);
    const x = Math.cos(userLat) * Math.tan(meccaLat) - Math.sin(userLat) * Math.cos(dLng);
    let bearing = Math.atan2(y, x) * 180 / Math.PI;
    bearing = (bearing + 360) % 360;
    expect(bearing).toBeLessThan(5);
  });
});
