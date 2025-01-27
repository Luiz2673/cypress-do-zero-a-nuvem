describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html');
  })
  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário',() => {
    cy.get('#firstName').type('Luiz Fernando')
    cy.get('#lastName').type('Gomes')
    cy.get('#email').type('luizfgomes42@gmail.com')
    cy.get('#open-text-area').type('O curso é muito bom estou gostando de como estou me desenvolvendo e quero me tornar um QA até Julho de 2025', {delay:0})
    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida',() => {
    cy.get('#firstName').type('Luiz Fernando')
    cy.get('#lastName').type('Gomes')
    cy.get('#email').type('luizfgomes42#gmail.com')
    cy.get('#open-text-area').type('O curso é muito bom estou gostando de como estou me desenvolvendo e quero me tornar um QA até Julho de 2025', {delay:0})
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('campo de telefone só aceita números',() => {
    cy.get('#phone')
      .type('aaaaAAAA', {delay:0})
      .should('not.have.value', String)
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Luiz Fernando')
    cy.get('#lastName').type('Gomes')
    cy.get('#email').type('luizfgomes42@gmail.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('O curso é muito bom estou gostando de como estou me desenvolvendo e quero me tornar um QA até Julho de 2025', {delay:0})
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone',() =>{
    cy.get('#firstName')
      .type('Luiz Fernando')
      .should('have.value', 'Luiz Fernando')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type('Gomes')
      .should('have.value', 'Gomes')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type('luizfgomes42@gmail.com')
      .should('have.value', 'luizfgomes42@gmail.com')
      .clear()
      .should('have.value', '')
    cy.get('#phone')
      .type('11977217225')
      .should('have.value', '11977217225')
      .clear()
      .should('have.value', '')
  })
  
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios',() =>{
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado',() =>{
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')
  })
})
