/// <reference types="cypress" />

describe("Blog page", () => {
  beforeEach(() => {
    cy.visit("/blog")
  })

  it("lists published articles with metadata", () => {
    cy.get('[data-cy="article-list"]').should("be.visible")
    cy.get('[data-cy="article-card"]')
      .its("length")
      .should("be.greaterThan", 0)

    cy.get('[data-cy="article-card"]')
      .first()
      .within(() => {
        cy.get("h2 a").should("have.attr", "href").and("include", "/blog/")
        cy.contains(/\b\d{4}\b/).should("exist")
        cy.contains(/min read\./).should("be.visible")
      })
  })

  it("opens an article and returns to the list", () => {
    cy.get('[data-cy="article-card"]')
      .first()
      .within(() => {
        cy.get("h2 a").click()
      })

    cy.location("pathname").should("match", /^\/blog.+/)
    cy.get("article h1").should("be.visible")
    cy.contains("Go back").click()

    cy.location("pathname").should("match", /^\/blog\/?$/)
    cy.get('[data-cy="article-list"]').should("be.visible")
  })
})
