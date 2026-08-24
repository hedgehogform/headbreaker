import { existsSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('build config', () => {
  it('uses tsdown for package builds', () => {
    const manifest = JSON.parse(readFileSync('package.json', 'utf8'));

    expect(manifest.scripts.build).toBe('tsdown --config tsdown.config.mts');
    expect(manifest.devDependencies.tsdown).toBeDefined();
    expect(manifest.devDependencies.tsup).toBeUndefined();
    expect(existsSync('tsdown.config.mts')).toBe(true);
    expect(existsSync('tsup.config.ts')).toBe(false);
  });
});
