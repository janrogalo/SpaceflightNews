# SpaceflightNews

DONE:

1.Display a list of X fetched articles.
2.X should be a limit that could be set up by a user (add an input for that). The default value should be 15.
3.Articles in Library should be saved after leaving the page (you can use e.g. localStorage) and set on init.
4.Each article should be displayed as a card and contain information such as title, newsSite, publishedAt date, summary (shorten to max. 200 characters), button "Read article" which works as a hyperlink to an article, and button "Add to Library" which saves article in a library (if an article is already added, the button should be" Remove from Library ").
5.Create a separate page "Library" to display a list of saved articles (show the same cards as above).

PARTIALY DONE:
1.Allow sorting Library ascending and descending by publishedAt date and by title.

NOT DONE:
1.There should be pagination (preferably Infinite Scroll), so if you scroll to the bottom of the page, fetch the following X articles.
2.At the top of the page should be sticked counter, displaying how many articles are fetched out of total (e.g. 45/12917).

