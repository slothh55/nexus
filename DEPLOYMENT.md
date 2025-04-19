# Local Deployment Instructions

This document provides instructions for deploying the Digital Inclusion Companion project locally.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone https://github.com/slothh55/nexus.git
cd nexus
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

## Development Server

To run the development server:

```bash
npm run dev
# or
yarn dev
```

This will start the application at [http://localhost:3000](http://localhost:3000).

## Production Build

To create a production build:

```bash
npm run build
# or
yarn build
```

This will generate a static export in the `out` directory.

## Serving the Static Build

You can serve the static build using any static file server. For example:

### Using Node.js serve package:

```bash
npm install -g serve
serve out
```

### Using Python's built-in HTTP server:

```bash
cd out
python -m http.server 8000
```

Then visit [http://localhost:8000](http://localhost:8000) in your browser.

## Deployment Options

### Option 1: GitHub Pages

1. Push the `out` directory to the `gh-pages` branch:
```bash
npm run build
npx gh-pages -d out
```

2. Configure GitHub Pages in your repository settings to use the `gh-pages` branch.

### Option 2: Vercel (Recommended for Next.js)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

### Option 3: Netlify

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Deploy:
```bash
netlify deploy --dir=out --prod
```

## Environment Variables

No environment variables are required for basic functionality as this is a static site.

## Troubleshooting

- If you encounter any issues with the build process, try clearing the cache:
```bash
rm -rf .next out
npm run build
```

- For any dependency issues, ensure you're using the correct Node.js version and try reinstalling dependencies:
```bash
rm -rf node_modules
npm install
```
