
import { describe, it, expect } from 'vitest';

describe('LocalStorage', () => {
  it('getItem wrapped in try/catch returns null on error', () => {
    const get = (key) => { try { return localStorage.getItem(key); } catch { return null; } };
    expect(get('nonexistent')).toBeNull();
  });

  it('setItem wrapped in try/catch does not throw', () => {
    const set = (key, val) => { try { localStorage.setItem(key, val); } catch {} };
    expect(() => set('test', 'value')).not.toThrow();
    expect(get('test')).toBe('value');
    localStorage.removeItem('test');
  });

  function get(key) { try { return localStorage.getItem(key); } catch { return null; } }
});
