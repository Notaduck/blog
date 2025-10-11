# gatsby-mdx-tailwindcss-starter

Gatsby mdx tailcss is a minimal starter. I have had multiple different blogs in the past and 
it eventually always results in me not delivering nay content 

Features
- Basic setup for a full-featured developer blog
- Mdx and Md files
- Support for code highligting
- Pagination
- Contact form (in development)
- Tailwindcss for styling

## Cypress on Netlify

Netlify builds run the Cypress end-to-end suite via `@netlify/plugin-cypress`. The plugin uses
the existing `cypress.config.ts` and respects the `CYPRESS_BASE_URL` environment variable, falling
back to the deployed preview URL that Netlify injects. No extra GitHub Action is required—tests
execute automatically during the post-build phase of each deploy preview. Run `netlify build`
locally if you want to reproduce the plugin behaviour on your machine.
