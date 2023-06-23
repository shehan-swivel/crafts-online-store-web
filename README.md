# Craftify Web UI

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Clone the repository

```bash
$ git clone https://github.com/shehanswivel/crafts-online-store-web
```

## Installation

```bash
$ npm install
# or
$ yarn install
```

## Environment variables

Make sure to create .env.local file in the project root with the variables that included in .env.example file.

If you are using a separate development environment other than the local development environment, make sure to create .env.development file in the project root with the variables that included in .env.example file.

To include production specific environment variable, create .env.production file in the project root with the variables that included in .env.example file.

Learn more - https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables

```bash
# REST API base URL
NEXT_PUBLIC_API_URL=<https://your-rest-api.com>
```

## Running the app

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Note: 
The admin login page link is not displayed in the user interface as it is only needed for admins.

To log in to the admin dashboard, follow these steps:

1. Open a web browser.
2. Enter the following URL: [http://localhost:3000/login](http://localhost:3000/login) 
3. You will be redirected to the admin login page.
4. Provide your admin credentials to log in and access the admin dashboard.  

## Test

```bash
# unit tests
$ npm test
```

## Project structure

This project follows the Atomic Design pattern for organizing components.

[Atomic Design Methodology](https://atomicdesign.bradfrost.com/chapter-2) - learn more about the Atomic Design pattern

```bash
src/              # Source folder
  __tests__/      # Contains all the app test files  
    /atoms
    /molecules
    /organisms
    /pages
    /templates   
  components/     # Contains all the app components
    /atoms
    /molecules
    /organisms
    /templates
  config/         # Contains app configurations
  constants/      # Contains all the constants
  contexts/       # Contains all the context providers
  hooks/          # Contains all the custom hooks
  pages/          # Contains all the pages
  services/       # Contains all the service files
  store/          # Contains redux store and slices
    /slices       # Contains redux slices
  styles/         # Contains all the style files
  types/          # Contains all the custom types
  utils/          # Contains utility functions
    /validations
  middleware.ts   # Nextjs middleware file
.env.example
.eslintrc.json
.gitignore
jest.config.js
next.config.js
next.d.ts
package-lock.json
package.json
README.md
tsconfig.json
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
