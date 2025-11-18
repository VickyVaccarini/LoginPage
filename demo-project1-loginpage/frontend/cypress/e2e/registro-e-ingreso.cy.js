describe('Registro y acceso feliz', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.esperarCuandoAzureSePoneLento(2000);
    });

    it('registra un usuario nuevo y luego inicia sesion para llegar al perfil', () => {
        const username = `demo${Date.now()}`;
        const password = 'ClaveSegura!A';

        cy.intercept('POST', '**/api/register', (req) => {
            req.reply({
                statusCode: 201,
                body: { username: req.body.username },
            });
        }).as('registerRequest');

        cy.intercept('POST', '**/api/login', (req) => {
            req.reply({
                statusCode: 200,
                body: { username: req.body.username },
            });
        }).as('loginRequest');

        cy.contains('Crear cuenta').click();
        cy.esperarCuandoAzureSePoneLento(1500);

        cy.url().should('include', '/register');
        cy.contains('Crear cuenta').should('be.visible');
        cy.esperarCuandoAzureSePoneLento(800);

        cy.get('#register-username').type(username);
        cy.esperarCuandoAzureSePoneLento(700);

        cy.get('#register-password').type(password);
        cy.esperarCuandoAzureSePoneLento(700);

        cy.contains('button', 'Registrarme').click();
        cy.esperarCuandoAzureSePoneLento(1200);

        cy.wait('@registerRequest').its('request.body').should('deep.include', {
            username,
            password,
        });
        cy.esperarCuandoAzureSePoneLento(800);

        cy.url().should('include', '/login');
        cy.contains('Iniciar sesion').should('be.visible');
        cy.esperarCuandoAzureSePoneLento(800);

        cy.get('#username').type(username);
        cy.esperarCuandoAzureSePoneLento(600);

        cy.get('#password').type(password);
        cy.esperarCuandoAzureSePoneLento(600);

        cy.contains('button', 'Ingresar').click();
        cy.esperarCuandoAzureSePoneLento(1200);

        cy.wait('@loginRequest').its('request.body').should('deep.include', {
            username,
            password,
        });
        cy.esperarCuandoAzureSePoneLento(1000);

        cy.url().should('include', '/profile');
        cy.contains('Mi perfil').should('be.visible');
        cy.contains(`@${username}`).should('be.visible');
        cy.esperarCuandoAzureSePoneLento(1000);
    });
});
