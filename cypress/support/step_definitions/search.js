import { Given, When, Then} from "@badeball/cypress-cucumber-preprocessor";
import Search from '../../e2e/components/searchbar-component';

beforeEach(() => {
  cy.visit('https://www.imdb.com/es/', {
    timeout: 60000,
    failOnStatusCode: false,
    waitUntil: 'domcontentloaded'
  })
})

//-------------------------------------- Given: common step --------------------------------------//

Given('The homepage is loaded and the search bar is visible', () => {

    Search.elements.getSearchInput()
    .should('be.visible')
    .and('have.attr', 'placeholder', 'Buscar en IMDb')

  })

//-------------------------------------- Scenario 1: Successful Search of a Movie --------------------------------------//

When('User enters Film name as {string} and User clicks on search button', (movieName) => {

    Search.elements.getSearchInput().clear().type(movieName)
    Search.elements.getSearchButton().click({ force: true })
    cy.wrap(movieName).as('selectedMovie')

  })
  
Then('User is able to successfully see results displayed for the search', () => {
   
    cy.get('@selectedMovie').then((movieName) => {
      Search.elements.getResultItems()
        .should('exist')
        .and('have.length.greaterThan', 0)
        .then(($items) => {

          const found = [...$items].some(item =>
            item.innerText.toLowerCase().includes(movieName.toLowerCase())
          )

          expect(found).to.be.true

        })
      })
  })

//-------------------------------------- Scenario 2: Inexistent Movie Search --------------------------------------//
  
When('User enters Inexistent film name as {string} and User clicks on search button', (filmName) => {

    Search.elements.getSearchInput().clear().type(filmName)
    cy.contains(`See all results for "${filmName}"`).should('be.visible')
    Search.elements.getSearchButton().click({ force: true })

  })
  
Then('User is able to see validation message of inexistent films in Results section', () => {

    Search.elements.getNoResultsMessage()
      .should('be.visible')
      .and('contain.text', 'No se encontraron resultados para')

  })

//-------------------------------------- Scenario 3: Search bar autocomplete suggestion --------------------------------------//
  
When('User starts to type syllables as {string} and User waits to see suggestions in box displayed under the search bar', (syllables) => {

      Search.elements.getSearchInput().clear().type(syllables)
      Search.elements.getSuggestionsBox().should('be.visible')

    })
    
    
Then('User is able to successfully see suggestions displayed in the box', () => {

    Search.elements.getSuggestionItems()
    .should('have.length.gt', 0)
    .first()
    .then(($el) => {

      Search.elements.getSearchInput().invoke('val').then((typedText) => {

        expect($el.text().toLowerCase()).to.contain(typedText.toLowerCase())

      })

    })
  })