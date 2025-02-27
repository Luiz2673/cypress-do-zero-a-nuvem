describe('Testando as página de Politica de Privacidade de forma idenpendente',() => {
    beforeEach(() =>{
        cy.visit('./src/privacy.html')
    })
    it('Conferindo o título da página', () =>{
        cy.title()
            .should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de Privacidade')
    })
})