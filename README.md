# Auth-Project

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## NPM Scripts

```bash
npm run dev
```

To run the project in development mode.

```bash
npm run build
```

To make a build of the project that can be deployed on production environment.

```bash
npm start
```

To run the project in production mode from the build that we have made using `npm run build` in our local machine.

```bash
npm run build:stats
```

Created a separate shell file to record how the size of the build is growing with time and development.

```bash
npm run lint
```

This command identifies and returns the linting errors in the project.

```bash
npm run lint:fix
```

This command fixes most of the linting errors which could be fixed automatically, if present.

```bash
npm test
# or
npm t
```

This command runs all the test-cases whether frontend related or backend related.

```bash
npm run test:watch
```

This command runs all the test-cases whether frontend related or backend related. This command will keep on running and look for changes. And runs again when finds one.

```bash
npm run test:coverage
```

This command shows the coverage report that how much code is covered under test cases and how much is left.

```bash
npm run test:snapshot
```

This command refreshes all the snapshots that are taken till now and will create new snapshots for the components we want. But we should update the snapshots only after understanding the changes.

```bash
npm run test:fe
```

This command runs all the test-cases related to front-end.

```bash
npm run test:be
```

This command runs all the test-cases related to back-end.

```bash
# Not a command. It's a setup
postinstall
```

`postinstall` script will get auto-fired when we run `npm install`. After installing all the dependencies, it runs the command mentioned in `postinstall`.

```bash
npm run prettier
```

This command scans and fixes all the files as per the rules mentioned under `.prettierrc`.

```bash
npm run storybook
```

This command starts the storybook to show the various components in the project, if we have their corresponding story files created.

```bash
npm run build-storybook
```

This command makes a build of storybook. That build can be run using utilities like lite-server etc.

```bash
npm run chromatic
```

This command helps in updating the snapshots of the components @ chromatic. So that they could be approved in code review. This command is particularly helpful in CI.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
