import { test as base, type Page } from '@playwright/test';

// Mock Aladhan API response
const MOCK_PRAYER_TIMES = {
  code: 200, status: 'OK',
  data: {
    timings: { Fajr: '04:33', Dhuhr: '11:26', Asr: '14:48', Maghrib: '17:18', Isha: '18:20' },
    date: { readable: '10 Jun 2026', timestamp: '1781049600',
      hijri: { date: '24-12-1447', day: '24', month: { number: 12, en: 'Dhu al-Hijjah', ar: 'ذو الحجة', days: 29 }, year: '1447', designation: { abbreviated: 'AH', expanded: 'Anno Hegirae' } },
      gregorian: { date: '10-06-2026', day: '10', month: { number: 6, en: 'June' }, year: '2026', designation: { abbreviated: 'AD', expanded: 'Anno Domini' } },
    },
    meta: { latitude: -7, longitude: 113, timezone: 'Asia/Jakarta', method: { id: 2, name: 'ISNA', params: { Fajr: 15, Isha: 15 } }, latitudeAdjustmentMethod: 'ANGLE_BASED', midnightMode: 'STANDARD', school: 'STANDARD', offset: {} },
  },
};

export const test = base.extend({
  page: async ({ page }, use) => {
    await page.route('**/api.aladhan.com/**', route => {
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(MOCK_PRAYER_TIMES) });
    });
    await use(page);
  },
});

export { expect } from '@playwright/test';
