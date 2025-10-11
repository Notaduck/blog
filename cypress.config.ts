import { defineConfig } from "cypress";

const baseUrl =
  process.env.CYPRESS_BASE_URL ??
  process.env.DEPLOY_PRIME_URL ??
  process.env.DEPLOY_URL ??
  "http://localhost:8000";

export default defineConfig({
  e2e: {
    baseUrl,
    supportFile: "cypress/support/e2e.ts",
    viewportWidth: 1280,
    viewportHeight: 720,
  },
  video: false,
  screenshotOnRunFailure: true,
});
