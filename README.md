# Shopify Frontend Fall Internship Challenge 2021

[Link to the app](https://shopify.tyrus.im/)

[Challenge](https://docs.google.com/document/d/1SdR9rQpocsH5rPTOcxr9noqHRld5NJlylKO9Hf94U8U/edit#heading=h.31w9woubunro)

![Landing page and library view](https://tyrus.im/shopify/card.png)

# Features

- All movie additions and deletions are autosaved via browser local storage
- Library view and search view state
    - Library view
        - Default state that displays posters of your current nominations
        - Can be accessed via `Switch view` button in the `Your Choices` column
        - Can be accessed by giving the search input an empty string and hitting `Enter`
        - When each poster is clicked a component pops up with additional details and information.
    - Search view
        - Active as soon as a user enters a search
        - Can be accessed via `Switch view` button in the `Your Choices` column.
        - Searches can be completed by using the search input element in the nav bar
        - Queries can be made by hitting `Enter` or `Search` button
        - Queries can be erased by hitting `Esc`
- Search Results box
    - Top 10 results displayed
    - Ability to view additional details of movie, or add it to your list
- Movie details component
    - Provided with additional details
        - Ratings
        - Plot
        - Director
        - Length
        - Rotten Tomato score
    - If the component is focused, you can close via `Esc`
- Share Link
    - Only available once 5 movies have been selected
    - Will save a link to user clipboard
- Notifications
    - when 5 movies have been selected
    - when a user clicks share link
- Responsive design

# Development

- [Next.js / React](https://nextjs.org/)

# CSS Styling

- [Shopify Polaris](https://github.com/Shopify/polaris-tokens)
