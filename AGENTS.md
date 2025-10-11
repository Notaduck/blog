# Repository Guidelines

## Project Structure & Module Organization
The Gatsby application lives under `src`. Page-level entries stay in `src/pages`, while shared layout, navigation, and form elements reside in `src/components`. Reusable data (navigation labels, hero copy) is defined in `src/content`, templates for generated pages in `src/templates`, and helper utilities in `src/utils`. Generated GraphQL typings are stored at the project root (`graphql-types.ts`, `gatsby-types.d.ts`). Assets such as global styles and images live in `src/styles` and `src/images`. Built artifacts land in `public`; avoid editing generated files directly.

## Build, Test, and Development Commands
Use `yarn develop` (alias `yarn start`) for a hot-reloading dev server at `http://localhost:8000`. Run `yarn build` to create the production bundle, and `yarn serve` to preview the build locally. Clear Gatsby caches with `yarn clean` when schema or content changes are not reflected. After installing Cypress, execute `yarn cypress open` for interactive runs or `yarn cypress run` for headless CI checks.

## Coding Style & Naming Conventions
The codebase is TypeScript-first. Components use PascalCase filenames (`ContactForm.tsx`), hooks are in camelCase, and directories prefer kebab-case only for generated outputs. TailwindCSS provides utility classes; prefer composition over inline styles. Keep React components presentational where possible, isolating data access in hooks or `src/api`. Use 2-space indentation and format changes with `yarn format` before pushing.

## Testing Guidelines
Cypress e2e specs belong in `cypress/e2e` and should cover navigation, form validation, and critical content render paths. Name specs after the user journey (`contact-form.cy.ts`). Stub external requests with `cy.intercept` so tests remain deterministic. For unit coverage, follow Gatsby’s recommendation to colocate tests next to the module (`component.test.tsx`) if Jest is introduced later. GitHub Actions runs `yarn build` and `yarn cypress run` via `.github/workflows/ci.yml`, so keep specs deterministic and skip flake-prone external dependencies.

## Commit & Pull Request Guidelines
Adopt conventional, present-tense commit titles (`feat: add contact form animations`). Group related changes into cohesive commits, and keep bodies under 72 characters per line. PRs should summarize intent, link to any TASKS.md item or issue, and describe testing results (`yarn build`, `yarn cypress run`). Include screenshots or GIFs for visible UI tweaks, and call out follow-up work in a checklist when needed. Request review once CI is green and merge conflicts are resolved.
