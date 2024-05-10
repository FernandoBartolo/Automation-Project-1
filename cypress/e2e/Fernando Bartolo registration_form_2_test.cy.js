beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})


// Assignement 4: add content to the following tests

describe('Section 1: Functional tests', () => {


    it('User can use only same both first and validation passwords', ()=>{
       
        cy.get('#username').type('Usertest')
        cy.get('#email').type('fern@gmail.com')
        cy.get('[data-cy="name"]').type('Fernando')
        cy.get('[data-testid="lastNameTestId"]').type('bartolo')
        cy.get('[data-testid="phoneNumberTestId"]').type('777888999')
        cy.get("input[name='password']").type('Newpass')
        cy.get('[name="confirm"]').type('Newpass123')
        cy.get('h2').contains('Password').click()

        // Assert submit button is not enabled
        cy.get('.submit_button').should('be.disabled')

        // Assert successful message is not visible
        cy.get('#success_message').should('not.be.visible')

        // Assert that error message is visible
        cy.get('#password_error_message').should('be.visible').should('contain', 'Passwords do not match!')

        // Test with matching passwords
        cy.get('[name="confirm"]').scrollIntoView()
        cy.get('[name="confirm"]').clear()
        cy.get('[name="confirm"]').type('Newpass')
        cy.get('h2').contains('Password').click()

        // Assert error message is not visible anymore
        cy.get('#password_error_message').should('not.be.visible')

        // Assert, that submit button is now enabled
        cy.get('.submit_button').should('be.enabled')
    })

    it('User can submit form with all fields added', ()=>{
        
        cy.get('#username').type('Usertest')
        cy.get('#email').type('fern@gmail.com')
        cy.get('[data-cy="name"]').type('Fernando')
        cy.get('[data-testid="lastNameTestId"]').type('Bartolo')
        cy.get('[data-testid="phoneNumberTestId"]').type('777888999')
        cy.get('#htmlFavLanguage').check()
        cy.get('#vehicle1').check()
        cy.get('select#cars').select('Volvo')
        cy.get('select#animal').select('Dog')
        cy.get("input[name='password']").type('Newpass')
        cy.get('[name="confirm"]').type('Newpass')
        cy.get('h2').contains('Password').click()

        // Assert submit button is enabled
        cy.get('.submit_button').should('be.enabled')

        // Assert succesful message is displayed
        cy.get('.submit_button'). click()
        cy.get('#success_message').should('be.visible')
    })
    it('User can submit form with valid data and only mandatory fields added', ()=>{
       
        cy.get('#username').type('Usertest')
        cy.get('#email').type('fern@gmail.com')
        cy.get('[data-cy="name"]').type('Fernando')
        cy.get('[data-testid="lastNameTestId"]').type('Bartolo')
        cy.get('[data-testid="phoneNumberTestId"]').type('777888999')
        cy.get("input[name='password']").type('Newpass')
        cy.get('[name="confirm"]').type('Newpass')
        cy.get('h2').contains('Password').click()

        // Assert that submit button is enabled
        cy.get('.submit_button').should('be.enabled')

        // Assert that after submitting the form system shows successful message
        cy.get('.submit_button'). click()
        cy.get('#success_message').should('be.visible')
    })
    
    it('User cannot submit form with mandatory field empty', ()=>{
        // Add test steps for filling in ONLY mandatory fields
        inputValidData('JohnDoe')
        // Clear username field
        cy.get('#username').scrollIntoView()
        cy.get('#username').clear()
        cy.get('h2').contains('Password').click()

        // Assert that submit button is not enabled
        cy.get('.submit_button').should('be.disabled')
        
        // Assert that successful message is not visible
        cy.get('#success_message').should('not.be.visible')
})
})
/*
Assignement 5: create more visual tests
*/
describe.only('Section 2: Visual tests', () => {
    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        // get element and check its parameter height
        // it should be less than 178 and greater than 100
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)   
    })

    it('Test for second picture', () => {
        // Create similar test for checking the second picture
        cy.log('Will check logo source and size')
        cy.get('[data-cy="cypress_logo"]').should('have.attr', 'src').should('include', 'cypress_logo')
        // get element and check its parameter height
        // it should be less than 178 and greater than 100
        cy.get('[data-cy="cypress_logo"]').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 80)
    })
   
   
    it('Check navigation to Form 3', () => {
        cy.get('nav').children().should('have.length', 2)
        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        // Get navigation element, find its first child, check the link content and click it
        cy.get('nav').children().eq(1).should('be.visible')
            .and('have.attr', 'href', 'registration_form_3.html')
            .click()
        // Check that currently opened URL is correct
        cy.url().should('contain', '/registration_form_3.html')
        // Go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

        
        it('Check that checkbox list is correct', () => {
            // Array of found elements with given selector has 3 elements in total
            cy.get('input[type="checkbox"]').should('have.length', 3)
            // Verify labels of the checkboxes
            cy.get('input[type="checkbox"]').next().eq(0).should('have.text','I have a bike')
            cy.get('input[type="checkbox"]').next().eq(1).should('have.text','I have a car')
            cy.get('input[type="checkbox"]').next().eq(2).should('have.text','I have a boat')
            //Verify default state of checkboxes
            cy.get('input[type="checkbox"]').eq(0).should('not.be.checked')
            cy.get('input[type="checkbox"]').eq(1).should('not.be.checked')
            cy.get('input[type="checkbox"]').eq(2).should('not.be.checked')
            // Selecting one will keep selection of the other checkbox
            cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
            cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
            cy.get('input[type="checkbox"]').eq(0).should('be.checked')
        })
    it('Check that radio button list is correct', () => {
        
        cy.get('input[type="radio"]').should('have.length', 4)
        // Verify labels of the radio buttons
        cy.get('input[type="radio"]').next().eq(0).should('have.text','HTML')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','CSS')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','JavaScript')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','PHP')

        //Verify default state of radio buttons
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')
        // Selecting one will remove selection from the other radio button

        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    
    })
          
        it('Favourite animal dropdown is correct', () => {
        // Array of found elements with given selector has 6 elements in total
        cy.get('#animal').find('option').should('have.length', 6)
        // Check that all elements in the dropdown have correct text
        cy.get('#animal').find('option').eq(0).should('have.text', 'Dog')
        cy.get('#animal').find('option').eq(1).should('have.text', 'Cat')
        cy.get('#animal').find('option').eq(2).should('have.text', 'Snake')
        cy.get('#animal').find('option').eq(3).should('have.text', 'Hippo')
        cy.get('#animal').find('option').eq(4).should('have.text', 'Cow')
        cy.get('#animal').find('option').eq(5).should('have.text', 'Horse')
    })
})

function inputValidData(username) {
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type(username)
    cy.get('#email').type('fern@gmail.com')
    cy.get('[data-cy="name"]').type('John')
    cy.get('#lastName').type('Doe')
    cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
    cy.get('#password').type('MyPass')
    cy.get('#confirm').type('MyPass')
    cy.get('h2').contains('Password').click()
}