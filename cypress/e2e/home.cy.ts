/// <reference types="cypress" />

describe("Home page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("displays hero content and primary navigation", () => {
    cy.get('[data-cy="nav-brand"]').should("contain", "guldberglab");
    cy.get('[data-cy="nav-link-home-desktop"]').should("contain", "Home");
    cy.get('[data-cy="nav-link-blog-desktop"]').should("contain", "Blog");
    cy.get('[data-cy="nav-link-contact-desktop"]').should("contain", "Contact");

    cy.contains("My name is Daniel Guldberg A.").should("be.visible");
    cy.contains("Welcome to my personal portfolio and blog").should(
      "be.visible"
    );

    cy.get("#hero").should("exist");
  });

  it("supports in-page navigation to About and Contact sections", () => {
    cy.contains("Scroll").click();

    cy.window().its("scrollY").should("be.greaterThan", 0);
    cy.get("#about").within(() => {
      cy.contains("Who am I?").should("be.visible");
    });

    cy.scrollTo("top");
    cy.window().its("scrollY").should("be.closeTo", 0, 2);

    cy.get('[data-cy="nav-link-contact-desktop"]').click();
    cy.window().its("scrollY").should("be.greaterThan", 200);

    cy.get("#contact").within(() => {
      cy.contains("Ping me section").should("be.visible");
    });
  });

  it("navigates between pages using the desktop navbar", () => {
    cy.get('[data-cy="nav-link-blog-desktop"]').click();
    cy.location("pathname").should("match", /^\/blog\/?$/);
    cy.get('[data-cy="article-list"]').should("be.visible");
    cy.get('[data-cy="article-card"]').its("length").should("be.greaterThan", 0);

    cy.get('[data-cy="nav-link-home-desktop"]').click();
    cy.location("pathname").should("match", /^\/$/);
    cy.get("#hero").should("exist");

    cy.get('[data-cy="nav-link-contact-desktop"]').click();
    cy.window().its("scrollY").should("be.greaterThan", 200);
    cy.get("#contact").within(() => {
      cy.contains("Ping me section").should("be.visible");
    });
  });

  it("navigates between pages using the mobile navbar", () => {
    cy.viewport("iphone-6");
    cy.visit("/");

    cy.get('[data-cy="nav-menu-toggle"]').click();
    cy.get('[data-cy="nav-link-blog-mobile"]').click();
    cy.location("pathname").should("match", /^\/blog\/?$/);

    cy.get('[data-cy="nav-menu-toggle"]').click();
    cy.get('[data-cy="nav-link-home-mobile"]').click();
    cy.location("pathname").should("match", /^\/$/);

    cy.get('[data-cy="nav-menu-toggle"]').click();
    cy.get('[data-cy="nav-link-contact-mobile"]').click();
    cy.location("pathname").should("match", /^\/$/);
    cy.window().its("scrollY").should("be.greaterThan", 200);
    cy.get("#contact").within(() => {
      cy.contains("Ping me section").should("be.visible");
    });
  });

  it("validates and submits the contact form", () => {
    cy.get('[data-cy="contact-submit"]').click();

    cy.get('[data-cy="contact-name-error"]').should("contain", "Required");
    cy.get('[data-cy="contact-email-error"]').should("contain", "Required");
    cy.get('[data-cy="contact-subject-error"]').should("contain", "Required");
    cy.get('[data-cy="contact-text-error"]').should("contain", "Required");

    cy.intercept("POST", "/", {
      statusCode: 200,
      body: "OK",
      delay: 250,
    }).as("submitContact");

    cy.get('[data-cy="contact-name"]').type("Test User");
    cy.get('[data-cy="contact-email"]').type("test@example.com");
    cy.get('[data-cy="contact-subject"]').type("Feedback");
    cy.get('[data-cy="contact-text"]').type(
      "This is a detailed feedback message that easily clears the fifty character minimum enforced on the form."
    );

    cy.get('[data-cy="contact-submit"]').click();

    cy.contains("Loading...").should("be.visible");
    cy.wait("@submitContact");

    cy.contains("Thank's for reaching out to me!").should("be.visible");
    cy.contains(
      "I will do my best to get back to you as soon as possible."
    ).should("be.visible");
  });
});
