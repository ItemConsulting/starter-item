import type { Options } from '.';


import { globSync } from 'glob';
import { AND_BELOW, DIR_SRC_ASSETS } from './constants';


export default function buildAssetConfig(): Options {
  const GLOB_EXTENSIONS_ASSETS = '{tsx,ts,jsx,js}';
  const FILES_ASSETS = globSync(
    `${DIR_SRC_ASSETS}/${AND_BELOW}/*.${GLOB_EXTENSIONS_ASSETS}`
  ).map(s => s.replaceAll('\\', '/'));
  return {
    bundle: true,
    dts: false, // d.ts files are use useless at runtime
    entry: FILES_ASSETS,
    esbuildPlugins: [],

    // By default tsup bundles all imported modules, but dependencies
    // and peerDependencies in your packages.json are always excluded
    // external: [ // Must be loaded into global scope instead
    // ],

    format: ['esm'],
    minify: process.env.NODE_ENV === 'development' ? false : true,
    // noExternal: [],
    platform: 'browser',

    silent: ['QUIET', 'WARN']
      .includes(process.env.LOG_LEVEL_FROM_GRADLE||''),

    splitting: true,
    sourcemap: process.env.NODE_ENV === 'development' ? false : true,
    tsconfig:`${DIR_SRC_ASSETS}/tsconfig.json`,
  };
}
