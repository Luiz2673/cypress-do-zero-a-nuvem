Cypress.Commands.add('fillMandatoryFieldsAndSubmit', ()=>{
    cy.get('#firstName').type('Luiz Fernando')
    cy.get('#lastName').type('Gomes')
    cy.get('#email').type('luizfgomes42@gmail.com')
    cy.get('#open-text-area').type('O curso é muito bom estou gostando de como estou me desenvolvendo e quero me tornar um QA até Julho de 2025', {delay:0})
    cy.get('.button').click()
})