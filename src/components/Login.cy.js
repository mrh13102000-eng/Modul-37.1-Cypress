import Login from "./Login";

describe("Komponen Login", () => {
  it("menampilkan 10 data user setelah klik Ambil User", () => {
    const fakeUsers = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      phone: `0812000000${i}`,
    }));

    cy.intercept("GET", "https://jsonplaceholder.typicode.com/users", {
      statusCode: 200,
      body: fakeUsers,
    }).as("getUsers");

    cy.mount(<Login />);

    cy.get(".fetch-user-button").click();
    cy.wait("@getUsers");

    cy.get(".user-name").should("have.length", 10);
  });

  it("menampilkan pesan sukses saat form diisi dengan benar", () => {
    cy.intercept("POST", "https://jsonplaceholder.typicode.com/users", {
      statusCode: 201,
      body: { id: 11 },
    }).as("postUser");

    cy.mount(<Login />);

    cy.get(".name-input").type("Ridho");
    cy.get(".email-input").type("ridho@example.com");
    cy.get(".phone-input").type("08123456789");

    cy.get(".post-user-button").click();
    cy.wait("@postUser");

    cy.get(".success-response")
      .should("be.visible")
      .and("contain", "Berhasil membuat user!");
  });

  it("menampilkan pesan error saat form kosong", () => {
    cy.mount(<Login />);

    cy.get(".post-user-button").click();

    cy.get(".fail-response")
      .should("be.visible")
      .and("contain", "Masukan data user!");
    cy.get(".success-response").should("not.exist");
  });
});
