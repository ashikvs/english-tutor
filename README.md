# English with Amrtha

A beginner-friendly English learning app built with React, Vite, and TypeScript.

## Development

- npm install installs the dependencies.
- npm run dev starts the local development server.
- npm run typecheck checks the TypeScript project.
- npm run build creates the production build in dist/.
- npm run preview serves the production build locally.

## Learning content

The first 20 days of the 30-day professional-English curriculum are available. Each lesson includes a grammar explanation with Malayalam support, five workplace examples, five interactive practice questions, a writing prompt, and a final assessment. Writing feedback currently checks only minimum length and ending punctuation; it does not evaluate grammar or meaning.

Lesson content lives in src/data/; the app shell and guided lesson flow live in src/app/. CSS Modules are supported by Vite without an extra styling dependency. Completed lessons and learning dates for the streak are saved in browser storage on the current device and browser profile. XP is calculated from completed lessons. Writing responses are not saved, and progress does not sync across devices.
