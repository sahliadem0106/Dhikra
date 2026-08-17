
import { describe, it, expect } from 'vitest';

describe('Build', () => {
  it('package.json has required scripts', () => {
    const pkg = require('../../package.json');
    expect(pkg.scripts).toHaveProperty('dev');
    expect(pkg.scripts).toHaveProperty('build');
    expect(pkg.scripts).toHaveProperty('preview');
  });

  it('vite-plugin-pwa is installed', () => {
    try {
      require.resolve('vite-plugin-pwa');
      expect(true).toBe(true);
    } catch {
      expect.fail('vite-plugin-pwa not installed');
    }
  });
});
