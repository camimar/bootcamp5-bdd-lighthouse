Feature: search

    Scenario Outline: Successful Search of a Movie
        Given The homepage is loaded and the search bar is visible
        When User enters Film name as '<movieName>' and User clicks on search button
        Then User is able to successfully see results displayed for the search

        Examples:
            | movieName    |
            | The Matrix   |
            | Nosferatu    |
            | Inception    |
            | Parasite     |
            | Interstellar |

    Scenario Outline: Inexistent Movie Search
        Given The homepage is loaded and the search bar is visible
        When User enters Inexistent film name as '<filmName>' and User clicks on search button
        Then User is able to see validation message of inexistent films in Results section

        Examples:
            | filmName      |
            | asdffg123     |
            | blahblahhh    |
            | inexistent123 |

    Scenario Outline: Search Bar Autocomplete Suggestion
        Given The homepage is loaded and the search bar is visible
        When User starts to type syllables as '<syllables>' and User waits to see suggestions in box displayed under the search bar
        Then User is able to successfully see suggestions displayed in the box

        Examples:
            | syllables |
            | va        |
            | the       |
            | Las       |