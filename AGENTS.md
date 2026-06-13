# AGENTS.md

Guidance for AI coding agents working in this repository.

## Project Overview

This repository contains the official Stackpress website and documentation site.
It is a private Node/TypeScript project using Stackpress, React, Vite, UnoCSS,
and local Stackpress plugins.

Primary source areas:

- `content/` contains Markdown documentation and API reference source material.
- `plugins/` contains local Stackpress plugins, route handlers, helpers, and TSX views.
- `config/` contains Stackpress runtime and build configuration.
- `public/` contains static source assets copied into the generated site.
- `scripts/build.ts` builds the GitHub Pages-ready static output.

Generated or transient areas:

- `docs/` is generated static output for GitHub Pages.
- `.build/`, `public/assets/`, and `public/client/` are generated build artifacts.
- `node_modules/` is dependency output.

Prefer editing source files over generated output. Only update `docs/` by running
the documented build command when the static site output is intentionally part of
the change.

## Commands

Use these npm scripts from the repository root:

- `npm run dev` starts the Stackpress development server on `127.0.0.1:3000`.
- `npm run build` regenerates the static site in `docs/`.
- `npm run preview` starts the production-style Stackpress preview server.
- `npm run docs` serves the generated `docs/` folder on port `8080`.
- `npm run emit` runs the Stackpress emit command.

There is no dedicated test script in `package.json` at the time this file was
created. For TypeScript validation, run `npx tsc --noEmit` when relevant.

## Development Notes

- Keep the project ESM-compatible. Imports in TypeScript source use `.js`
  extensions for local modules.
- Follow the existing compact style: two-space indentation, semicolons, and
  grouped comment headers such as `//node`, `//modules`, `//config`, or
  `//client` where nearby files use them.
- Local plugins are registered through the `plugins` array in `package.json`.
  Add new plugin entries there only when introducing a new plugin package.
- Stackpress route handlers usually register inside `server.on('route', ...)`
  and pair data handlers with `server.view.get(...)`.
- Shared documentation page state should go through the existing helpers in
  `plugins/app/` rather than being reimplemented per plugin.
- Markdown guide ordering is encoded in the numbered `content/guides/*/*.md`
  paths and plugin manifests. Preserve that structure when adding or moving docs.
- Static assets that should be source-controlled belong in `public/`; the build
  copies them into `docs/`.

## Verification

Before finishing changes, run the narrowest useful checks:

- For documentation/content-only edits, inspect the affected Markdown and run
  `npm run build` when generated output is expected.
- For plugin, view, config, or build-script changes, run `npx tsc --noEmit` and
  `npm run build`.
- For UI-facing changes, run the development server and verify the affected page
  in a browser when practical.

If a command cannot be run in the current environment, report that clearly with
the reason.

## Git Hygiene

- Do not revert user changes or unrelated work in the tree.
- Keep changes scoped to the requested task.
- Avoid committing generated `docs/` changes unless the user requested a static
  site build output update or the workflow clearly requires it.
