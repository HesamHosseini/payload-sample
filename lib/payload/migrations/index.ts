import * as migration_20250522_191306 from './20250522_191306';

export const migrations = [
  {
    up: migration_20250522_191306.up,
    down: migration_20250522_191306.down,
    name: '20250522_191306'
  },
];
