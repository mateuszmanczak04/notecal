This is a web application which was made to help students organize their university notes.

Please use `bun` instead of `npm`

## Installation

```bash
bun install
```

Move `.env.example` content into `.env` file and replace variables with your own. It should look like this:

```env
DATABASE_URL=...
AUTH_SECRET=...
EMAIL_HOST=...
EMAIL_USER=...
EMAIL_PASSWORD=...
APP_DOMAIN="http://localhost:3000"
```

## Running dev server

```bash
npm run dev
```

Open http://localhost:3000

## Features

- courses for each school topic
- tasks management
- calendar view
- writing notes

What differs this app from others is that every note you take must be related to a course. It must also be placed somewhere in time so can say that Notecal Note is simply an Event with attached content.
