[![Netlify Status](https://api.netlify.com/api/v1/badges/2cc46a44-26d7-4d2d-8e58-dffee4e5f252/deploy-status)](https://app.netlify.com/sites/faith-investor-services-etfs/deploys)

## Getting Started

Install dependencies:
```bash
npm install
```

Run the development server:
```bash
npm run dev
```

## Stack

- [Next.js](https://nextjs.org/docs/pages)
- [Tailwind](https://tailwindcss.com/)
- [WP GQL](https://www.wpgraphql.com/)
- [ACF](http://advancedcustomfields.com)

## Technical Changes

If there are changes to ACF, the GQL types need to be regenerated.
```bash
npm run codegen
```
## Technical Changes vs WordPress Changes

Content is controlled by WordPress.

The exceptions are:
- the Header
- the Footer
since those areas rarely change and making the data work with Next.js is a lot of overhead.

Those areas will require code change.

## Deployments

Pushes to this respository will cause the site to build and deploy.

If Wordpress content has changed, a build needs to be triggered. This can be done in Wordpress.
