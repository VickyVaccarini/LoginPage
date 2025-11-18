describe('Home hacia Login', () => {
    beforeEach(() => {
        cy.visit('/');
        // Dejamos respirar al entorno antes de empezar las aserciones.
        cy.esperarCuandoAzureSePoneLento(2000);
    });

    it('permite navegar al login y valida las reglas del formulario', () => {
        cy.contains('Gestiona tu cuenta con facilidad y seguridad').should('be.visible');
        cy.esperarCuandoAzureSePoneLento(800);

        cy.contains('Iniciar sesion').click();
        cy.esperarCuandoAzureSePoneLento(1200);

        cy.url().should('include', '/login');
        cy.contains('Iniciar sesion').should('be.visible');
        cy.esperarCuandoAzureSePoneLento(800);

        cy.get('#username').type('abc1');
        cy.esperarCuandoAzureSePoneLento(500);

        cy.get('#password').type('abc');
        cy.esperarCuandoAzureSePoneLento(500);

        cy.contains('button', 'Ingresar').click();
        cy.esperarCuandoAzureSePoneLento(1200);

        cy.contains('El usuario debe contener al menos 4 letras').should('be.visible');
        cy.contains('La contrase').should('be.visible');
        cy.esperarCuandoAzureSePoneLento(800);
    });
});
