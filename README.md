# Short description

It is a web application which was made to help students organize their university notes. Main idea behind this app is to assign one rich-text note to one event in the calendar. Thanks to that it's easier for users to see which course subject was taught on the specific day and time. Moreover there is a task management system similar to ones in other popular applications.

# Technological stack

This app is split into 2 parts:
1. Backend and API routes in `./next-app` made with Next.js,
2. Frontend in `./vite-app` made with Vite/React.

Some of libraries/frameworks used are listed here (not all):

- AWS S3
- TailwindCSS
- TypeScript
- Shadcn-UI
- @tanstack/react-query
- date-fns
- motion (formerly framer motion)
- nodemailer
- puppeteer
- usehooks-ts
- Lexical text editor

and more...

# Deployment

Currently app is hosted on Vercel with database on neon.tech. It's also using AWS S3 for user notes because it is more optimal to keep e.g. 2 MB content as file blob instead of text in the database.

# Development

## Installation

I recommend using `bun` instead of `npm` but skipping this step should still work. Remember that in order to work properly you will have to launch frontend and backend separately (`cd ./next-app`, `cd ./vite-app`):

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
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
```

where:

- `DATABASE_URL` - for example `postgresql://admin:notecal@localhost:5432/development`
- `AUTH_SECRET` - any text
- `EMAIL_HOST`, `EMAIL_USER` and `EMAIL_PASSWORD` - needed for email verification after signing up
- `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` - needed to connect to AWS S3 where user notes are stored as json files

Then if you are going to send app to the production go to `./next-app/src/utils/app-domain.ts` and replace `app.notecal.app` with your own domain where you will host you frontend.

## Running development server

Run this script either in `next-app` adn `vite-app` folders:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) too see landing page. Or go directly to [http://localhost:5173](http://localhost:5173) to the app.

# Usage tutorial

I assume that you already have an account created so we can go deeper into main features.

## Courses

1. In the sidebar go to the "Courses" tab.
2. Click on "+" rectangle. It will show you a popup where you can create a new course, it may be e.g. Math, Physics, Chemistry or whatever...
3. Newly created course should appear in the grid and in the sidebar after unfolding list below "Courses" tab. Now you can simply click it to go there.

## Notes

4. Now you should see the most important part of the app which is note page.
5. Left side of your view is WYSIWYG content editor. At the top there is a toolbar where you can control your text formatting though shortcuts are also available.
6. Right side is sidebar with the following fields:
    - Course related - here you can modify course's name, teacher and accent color
    - Notes - all notes from the selected course
    - Useful links - quick access to pages which you like, it can be some external source like Youtube Tutorial etc.
    - Tasks - subset of user's tasks related specifically to the selected course
    - Note related - here you can modify specific note's setting, for now it's just a start and end time and "go to calendar" button if both properties exist
    - Settings - settings which are shared between all notes, these are: auto save, limit view width and new note duration
    - Danger zone - place to delete entire course and notes which are related to it
    - Customize sidebar - here you can choose which section on the sidebar you want to see and which not.

## Tasks

7. In the sidebar go to the "Tasks" tab.
8. First part you will probably see is a form where you are able to create a new task, let's put some title there and press "Enter".
9. Let's add a couple more of them.
10. Every task has it's controlg like due date, course and priority which are modifyable by dropdowns. You can also update titles and descriptions by simply clicking them and changing it's content. Remember that when you leave a task with emtpy title it becomes deleted.
11. Tasks are reorderable either by choosing new order in the dropdown below the creation form or by dragging tasks between two others.

## Calendar

12. Go to the "Calendar" tab in the sidebar.
13. You will probably see "days" view mode. If not, then you can change it in the top menu.
14. "Days" view mode is a well known calendar view with many days next to each other as columns.
15. In the top menu you can specify how many days at one you want to see, you can filter notes by courses, zoom in/out or move back/forward.
16. Let's change the view mode to "Month"
17. Now you should see a calendar grid where you can quickly see entire month. After clicking any of the grid tile you will be moved to that day in "days" view mode.
18. Last view mode is "list". It's nothing more complicated than the list of all notes one by one.

## Settings

19. Sidebar button at the same top is link to the /settings page. Currently there are just options to change email and password because other settings are moved closer to the place where you will probably use them.
