import { getVersion } from '/lib/xp/admin'

// Example server-side asset. This file is executed when the app gets loaded.
export function init(): void {
  log.info(`Server asset loaded. XP Version: ${getVersion()}`);
}

init();
