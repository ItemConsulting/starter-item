import type { Options } from '.';


import { globSync } from 'glob';
import {
  AND_BELOW,
  DIR_SRC,
  DIR_SRC_ASSETS,
} from './constants';


export default function buildServerConfig(): Options {
  const GLOB_EXTENSIONS_SERVER = '{ts,js}';
  const FILES_SERVER = globSync(
    `${DIR_SRC}/${AND_BELOW}/*.${GLOB_EXTENSIONS_SERVER}`,
    {
      absolute: false,
      ignore: globSync(
        `${DIR_SRC_ASSETS}/${AND_BELOW}/*.${GLOB_EXTENSIONS_SERVER}`
      )
    }
  ).map(s => s.replaceAll('\\', '/'));

  return {
    bundle: true,
    dts: false, // d.ts files are use useless at runtime
    entry: FILES_SERVER,
    env: {
      BROWSER_SYNC_PORT: '3100',
    },
    esbuildOptions(options, context) {
      // If you have libs with chunks, use this to avoid collisions
      options.chunkNames = '_chunks/[name]-[hash]';

      options.mainFields = ['module', 'main'];
    },

    external: [
      '/lib/cache',
      '/lib/enonic/static',
      /^\/lib\/guillotine/,
      '/lib/graphql',
      '/lib/graphql-connection',
      '/lib/http-client',
      '/lib/license',
      '/lib/mustache',
      '/lib/router',
      '/lib/util',
      '/lib/vanilla',
      '/lib/text-encoding',
      '/lib/thymeleaf',
      /^\/lib\/xp\//,
    ],
    format: 'cjs',
    minify: false, // Minifying server files makes debugging harder
    // noExternal: [],
    platform: 'neutral',

    silent: ['QUIET', 'WARN']
      .includes(process.env.LOG_LEVEL_FROM_GRADLE || ''),

    shims: false,
    splitting: true,
    sourcemap: false,
    target: 'es5'
  };
}

