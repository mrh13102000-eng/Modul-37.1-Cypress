describe("Halaman Utama", () => {
  it("Berhasil dimuat", () => {
    cy.visit("/");
    cy.contains("Hello Jayjay Cypress Student");
  });

  it("menampilkan 10 data user setelah klik Ambil User", () => {
    cy.visit("/");
    cy.get(".fetch-user-button").click();
    cy.get(".user-name", { timeout: 10000 }).should("have.length", 10);
  });

  it("menampilkan pesan sukses saat form diisi dengan benar", () => {
    cy.visit("/");

    cy.get(".name-input").type("Ridho");
    cy.get(".email-input").type("ridho@example.com");
    cy.get(".phone-input").type("08123456789");

    cy.get(".post-user-button").click();

    cy.get(".success-response", { timeout: 10000 })
      .should("be.visible")
      .and("contain", "Berhasil membuat user!");
  });

  it("menampilkan pesan error saat form kosong", () => {
    cy.visit("/");

    cy.get(".post-user-button").click();

    cy.get(".fail-response")
      .should("be.visible")
      .and("contain", "Masukan data user!");
    cy.get(".success-response").should("not.exist");
  });
});
