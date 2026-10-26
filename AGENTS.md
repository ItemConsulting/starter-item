# AGENTS.md

This file provides guidance to AI agents like Claude and Copilot when working with code in this repository.

## Description
Item Consulting's Enonic XP 8 starter. It is based on the Enonic XP TypeScript Starter
(https://github.com/enonic/starter-ts) and adds Item's stack: FreeMarker templates, Storybook, PostCSS, TypeScript
types generated from the YAML descriptors, and Changesets for versioning.

The starter source code is available on https://github.com/ItemConsulting/starter-item

In the file gradle.properties, if appName has changed from no.item.starter, this description should be updated, as you are currently in a new application that was created based on the starter.

## Build system

Gradle is the primary build tool, with a Node.js plugin for npm integration. However, builds require a contextual Enonic XP sandbox — the sandbox holds the specific XP version and the Java compiler needed to package the app into a JAR.

The `xpVersion` property in `gradle.properties` declares the target XP version (e.g. `8.0.2`). This determines which XP dependencies are used at build time, regardless of the sandbox version. The `@enonic-types/*` packages in `package.json` should be at least this version and no newer than the XP version the app is deployed to; the caret ranges let them drift within the 8.x line, so check them when bumping `xpVersion`.

Library dependencies in `build.gradle` use Gradle version catalogs: XP's own libraries come from the `xplibs` catalog (`include xplibs.portal`), which the `com.enonic.xp.settings` plugin generates from `xpVersion`; Enonic Market libraries, Item libraries (from https://repo.itemtest.no) and webjars are declared in `gradle/libs.versions.toml` and referenced as `libs.<alias>` (`include libs.static`). Never hardcode library coordinates or versions in `build.gradle`.

The normal approach is to use **Enonic CLI** commands, which wire the build to the correct sandbox and compiler. Direct `./gradlew` or `npm` commands work for TypeScript-only tasks (type checking, linting, testing) but the full build and deploy cycle should go through the Enonic CLI.

## Commands

### Enonic CLI (preferred for build & deploy)

```bash
enonic project create -r ItemConsulting/starter-item   # Create a new app from this starter
enonic dev                            # Build, deploy, and watch for changes (main development workflow)
enonic project build                  # Full build (wired to the sandbox's compiler)
enonic project deploy                 # Build and deploy to the sandbox
```

The Enonic CLI automatically selects the sandbox associated with the project. If no sandbox is linked, it will prompt to create or select one.

`.npmrc` disables npm's audit and fund requests: they add nothing to a build, and an unreachable audit endpoint stalls every `npm install` for npm's five-minute timeout.

### npm scripts (TypeScript tooling)

```bash
npm run build                 # tsdown (server + assets, see tsdown.config.mts) and PostCSS, concurrently
npm run format                # Prettier (configured in .prettierrc.json)
npm run storybook             # Storybook on http://localhost:6006 (needs XP running, see "Item stack" below)

npm run check                 # Types + lint concurrently
npm run check:types           # Type check only (server + assets)
npm run lint                  # oxlint (configured in .oxlintrc.json)

npm test                      # All tests (server + client projects)
npm test -- --testPathPattern="server"   # Server tests only
npm test -- --testPathPattern="client"   # Client tests only
npm run cov                   # Tests with coverage
```

### Gradle (used internally by Enonic CLI)

```bash
./gradlew build               # Full build (npm install + check + test + build + jar)
./gradlew build -Penv=dev     # Development build (NODE_ENV=development, no minification); `enonic dev` passes this automatically
./gradlew check               # Type checking + linting only
./gradlew test                # Tests only
```

## CI/CD

In CI/CD environments (no local sandbox), builds use the `enonic/enonic-ci` Docker image (e.g., `enonic/enonic-ci:8.0`) which contains the correct XP version, Enonic CLI, and Java compiler.

For GitHub Actions, the project uses `enonic/action-app-build@v1` which handles this automatically (see `.github/workflows/build.yml`). On other CI platforms (Jenkins, CircleCI, etc.), run `/setup_sandbox.sh` inside the container first, then `enonic project build`.

## Architecture

### Dual build: server vs. client

The codebase has two distinct build targets, both defined in a single `tsdown.config.mts` (an array of two configs):

**Server** (`src/main/resources/**/*.ts`, excluding `assets/`):
- Target: ES2015, CommonJS format, `platform: 'neutral'`
- Output: `build/resources/main/`
- Runtime-provided modules are marked `external` by rule (`isRuntimeModule` in `tsdown.config.mts`), not by list: an absolute import (`/lib/xp/*`, `/lib/graphql`, etc.) is bundled only when it is a source file of the app itself, otherwise it is left for the XP runtime to resolve. A mistyped specifier is caught by `check:types` (TS2307) rather than by the bundler, so it slips through in workflows that skip `check` (e.g. `deploy`, `dev`) and fails at runtime there.
- tsconfig: `src/main/resources/tsconfig.json`

**Client** (`src/main/resources/assets/**/*.ts`):
- Target: ES2023, ESM format, `platform: 'browser'`, minified in production
- Output: `build/resources/main/assets/`
- tsconfig: `src/main/resources/assets/tsconfig.json`

The server output is additionally re-lowered to ES5 by an SWC plugin in `tsdown.config.mts` (`nashornEs5`), because XP's Nashorn engine lacks some ES2015 syntax.

The `assets/` folder name follows the convention of **lib-asset** (`/lib/enonic/asset`, see the commented `include` in `build.gradle`), which serves that folder at runtime. To adopt **lib-static**'s `static/` convention instead, rename the folder and update every place the name is wired in: `SRC_ASSETS` in `tsdown.config.mts`, the `assets/**/*.*` exclude in `src/main/resources/tsconfig.json`, the `/assets/` moduleNameMapper in `jest.config.mjs`, the `extends` and `paths` in `src/jest/client/tsconfig.json`, and the `check:types:client` script in `package.json`.

### TypeScript toolchain

The project uses TypeScript 7 — the native (Go-based) compiler. Its npm package no longer exports the classic compiler API (`createProgram`, `transpileModule`); only `tsc` and an explicitly unstable `typescript/unstable/*` surface remain, which constrains the rest of the toolchain:

- `tsc` is used exclusively for type checking (`--noEmit`); all transpilation is done by tsdown (Oxc) and SWC, so the TypeScript version never affects build output or targets.
- Linting is done by **oxlint** (`.oxlintrc.json`), not ESLint — typescript-eslint requires the TS compiler API.
- Jest transpiles tests with **@swc/jest**, not ts-jest, and the Jest config is plain ESM (`jest.config.mjs`), not TypeScript — ts-jest and ts-node also require the TS compiler API.

Do not add ts-jest, ts-node, or typescript-eslint (or other packages with a `typescript <7` peer dependency): `npm install` will fail to resolve, and the TS7 package lacks the API they need at runtime.

### Path mappings

Server tsconfig maps:
- `/lib/xp/<name>` → `node_modules/@enonic-types/lib-<name>` (XP framework types) — one explicit entry per XP library plus a `/lib/xp/*` wildcard fallback. The explicit entries, combined with `typescript.preferences.autoImportSpecifierExcludeRegexes` in `.vscode/settings.json`, make IDE auto-import suggest the runtime-correct `/lib/xp/<name>` specifier instead of `@enonic-types/lib-<name>`. Add an entry (here and in `src/jest/server/tsconfig.json`) when installing a new `@enonic-types/lib-*` package.
- `/lib/freemarker`, `/lib/time` → `node_modules/@item-enonic-types/lib-<name>` (Item libraries). Add an entry when installing a new `@item-enonic-types/lib-*` package.
- `/*` → `./src/main/resources/*` (app-local imports) and `.xp-codegen/*` (generated descriptor types, e.g. `/cms/content-types`)

Jest moduleNameMapper mirrors these for tests:
- Server: `/lib/myproject/(.*)` → `src/main/resources/lib/myproject/$1`
- Client: `/assets/(.*)` → `src/main/resources/assets/$1`

### Testing

Two Jest projects with different environments:
- **Server tests** (`src/jest/server/`): Node.js environment, XP globals (`app`, `log`, etc.) mocked in `setupFile.ts`
- **Client tests** (`src/jest/client/`): jsdom environment

Both transpile test files with @swc/jest (no type checking; the tsconfig in each test folder, extending the respective source tsconfig, serves the editor). Each project has one smoke test (`globals.test.ts`, `main.test.ts`) that verifies the setup itself. Tests import `describe`/`it`/`expect`/`jest` from `@jest/globals` — there is no `@types/jest`. Because of that, SWC does not hoist `jest.mock()` above imports: to mock a module imported by the code under test, use `jest.doMock()` followed by `require()` inside the test. `.tsx` tests use the automatic JSX runtime and need `react/jsx-runtime` (or another `importSource`) installed.

### XP globals

Server-side code has access to Enonic runtime globals (`app`, `log`, `require`, `resolve`, `__`) via `@enonic-types/global`. These are real at runtime but must be mocked in tests.

## Item stack

### Generated types (xp-codegen-plugin)

The `no.item.xp.codegen` Gradle plugin reads the YAML descriptors in `cms/` and writes TypeScript types to
`.xp-codegen/` (git-ignored). `npmBuild` and `npmCheck` depend on its `generateTypeScript` task; run
`./gradlew generateTypeScript` after changing a descriptor if you only use npm scripts. Import the types with the same
path as the descriptor, e.g. `import type { Article } from "/cms/content-types"`.

Version 3 of the plugin (XP 8) is only published as a snapshot, from the repository in `settings.gradle`.

### FreeMarker

Views are rendered with `render()` from `/lib/freemarker` (lib-xp-freemarker 4.x). Each component keeps the type of
its template's model in a `<name>.freemarker.ts` file, shared by the controller and the story. These files and
`*.stories.ts` are left out of the server build in `tsdown.config.mts`.

### CSS

`src/main/resources/assets/styles/main.css` is built by PostCSS (`postcss.config.js`) to
`assets/styles/main.min.css`. Component CSS lives next to the component and is imported from `main.css`.

### Storybook

Stories (`*.stories.ts`) are rendered server-side by the xp-storybook app (https://github.com/ItemConsulting/xp-storybook),
which must be installed in the sandbox, with this app deployed in dev mode (`enonic dev`). The framework is
`@itemconsulting/storybook-framework-enonic-xp` (Vite), configured in `.storybook/`.

### Versioning

Versions are managed by Changesets (`npx changeset`). The Publish workflow opens a "Version Packages" pull request,
whose `versioning` script also writes the new version to `gradle.properties`.
