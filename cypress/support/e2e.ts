/// <reference types="cypress" />

Cypress.on("uncaught:exception", (err) => {
  if (err.message.includes("ResizeObserver loop limit exceeded")) {
    return false;
  }

  if (err.message.includes("removeChild")) {
    return false;
  }

  return undefined;
});
