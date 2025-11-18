describe('Errores durante el registro', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.esperarCuandoAzureSePoneLento(2000);
    });

    it('muestra un mensaje claro cuando la API rechaza el registro', () => {
        cy.intercept('POST', '**/api/register', {
            statusCode: 400,
            body: { message: 'El usuario ya existe' },
        }).as('registerError');

        cy.contains('Crear cuenta').click();
        cy.esperarCuandoAzureSePoneLento(1500);

        cy.get('#register-username').type('usuarioExistente');
        cy.esperarCuandoAzureSePoneLento(700);

        cy.get('#register-password').type('ClaveSegura!A');
        cy.esperarCuandoAzureSePoneLento(700);

        cy.contains('button', 'Registrarme').click();
        cy.esperarCuandoAzureSePoneLento(1200);

        cy.wait('@registerError');
        cy.esperarCuandoAzureSePoneLento(800);

        cy.contains('El usuario ya existe. Proba con otro nombre.').should('be.visible');
        cy.esperarCuandoAzureSePoneLento(800);
    });
});
