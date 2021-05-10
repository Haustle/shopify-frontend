# Shopify Frontend Fall Internship Challenge 2021

[Link to the app](https://shopify.tyrus.im/)

[Challenge](https://docs.google.com/document/d/1SdR9rQpocsH5rPTOcxr9noqHRld5NJlylKO9Hf94U8U/edit#heading=h.31w9woubunro)

![Landing page and library view](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/d1c92f88-20b5-4e3c-b409-2e262097acb1/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210509%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210509T234859Z&X-Amz-Expires=86400&X-Amz-Signature=379e6a8dfd31749f65f73bcbe3bc9437409c3ad5ff38b0f84b240a81225debd3&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)

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
