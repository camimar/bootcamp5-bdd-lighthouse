class Search {

    elements = {

        getSearchInput : () => cy.get('input#suggestion-search'),
        getSearchButton: () => cy.get('button#suggestion-search-button'),
        getResultSection: () => cy.get('[data-testid="find-results-section-title"]'),
        getResultItems: () => cy.get('[data-testid="find-results-section-title"] li'),
        getNoResultsMessage : () => cy.get('[data-testid="results-section-empty-results-msg"]'),
        getSuggestionsBox : () => cy.get('#react-autowhatever-navSuggestionSearch'),
        getSuggestionItems: () => cy.get('[id^="react-autowhatever-navSuggestionSearch--item-"]')

    }
}

module.exports = new Search()