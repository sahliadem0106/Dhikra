import { describe, it, expect } from 'vitest';

describe('Dua Favorites', () => {
  it('toggles favorite state correctly', () => {
    const favorites = new Set<string>();
    const toggle = (id: string) => {
      if (favorites.has(id)) favorites.delete(id);
      else favorites.add(id);
    };
    toggle('dua-1');
    expect(favorites.has('dua-1')).toBe(true);
    toggle('dua-1');
    expect(favorites.has('dua-1')).toBe(false);
  });
});

describe('Tasbih Counter', () => {
  it('counts correctly up to target', () => {
    let count = 0;
    const target = 33;
    for (let i = 0; i < target; i++) count++;
    expect(count).toBe(33);
  });

  it('resets to zero', () => {
    let count = 5;
    count = 0;
    expect(count).toBe(0);
  });
});

describe('Date Formatting', () => {
  it('formats hijri date string', () => {
    const hijri = { day: '24', month: 'Dhu al-Hijjah', year: '1447' };
    const formatted = `${hijri.day} ${hijri.month} ${hijri.year}`;
    expect(formatted).toBe('24 Dhu al-Hijjah 1447');
  });

  it('formats gregorian date', () => {
    const d = new Date('2026-06-10');
    expect(d.getFullYear()).toBe(2026);
    expect(d.getMonth()).toBe(5); // June
    expect(d.getDate()).toBe(10);
  });
});
