import 'cypress-xpath'
const { should, expect } = require("chai");

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

  it('seleciona um produto (YouTube) por seu texto', () =>{
    cy.get('select')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () =>{
    cy.get('select')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice',() =>{
    cy.get('select')
      .select(1)
      .should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () =>{
    cy.get('input[value = "feedback"]')
      .check()
      .should('be.checked')
  })

  it('marca cada tipo de atendimento', () =>{
    cy.get('input[type="radio"').each(($radio)=>{
      cy.wrap($radio)
        .check()
        should('be.checked')
    })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })
  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should(input => {
        // console.log(input[0].files[0].name)
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })
  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
    .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
    .should(input => {
      // console.log(input[0].files[0].name)
      expect(input[0].files[0].name).to.equal('example.json')
    })
  })
  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('#file-upload')
    .selectFile('@sampleFile')
    .should(input => {
      // console.log(input[0].files[0].name)
      expect(input[0].files[0].name).to.equal('example.json')
    })
  })
// Teste realizado por mim 
  it('Verificando se o atributo de privacidade possui o target_blank',() =>{
    cy.xpath("//a[@target='_blank']")
      .should('be.visible')
  })
  //********************************************************************************** 

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () =>{
    cy.get('a')
      .should('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () =>{
    cy.get('a')
      .invoke('removeAttr', 'target')
      .click()
  })
})
