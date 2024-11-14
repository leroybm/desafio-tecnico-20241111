# Desafio Técnico - Frontend

To run the project just run `docker compose up`, then open `http://localhost:4200/`

Alternatively, open the BACK and the FRONT with the correct node (see .nvmrc), and run `npm install`, then

FRONT: `npm start`
BACK: `npm run dev`

Then open `http://localhost:4200/`

## What was delivered

Almost all requirements (What is missing is the markdown editing)

I choose Angular as it's what I'm more familiar with, although I have been working with Next.JS lately, I feel that for traditional SPA
Angular has a lot of tools and common patterns that help a lot. The idea was to make something from the ground that was as close as possible that what I consider "production ready", but unfortunately I had to left a few things behind (See next section).

## What I missed due to timing

Note: I'll make a new branch `after-delivery` to code some of these, I hope you consider it as well! (Although I do have a weeding and a birthday to go to this weekend, so the changes will mostly appear after that)

- Refactoring some convoluted logic (some ternary operators in the template file for example)
- Making proper comments in the code
- Adding unit tests
- Paying more attention to accessibility (Kanban's are notoriously difficult to handle in that)
- Applying i18n (Should be pretty straight forward in Angular)
- Making sure the project runs well in multiple screen sizes
- Moving between lists using drag and drop 
  - This was in progress