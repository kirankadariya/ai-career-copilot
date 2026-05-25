# AI Career Copilot

AI Career Copilot is an AI-powered job search assistant that helps users create stronger resumes, improve cover letters, and prepare for interviews with personalized support.

This project is a polished React + Vite starter built for fast iteration and easy deployment on Netlify.

## Features

- **Home landing page** with hero messaging and product positioning
- **Resume Builder** page with placeholder AI guidance generation
- **Cover Letter Generator** page with placeholder draft generation
- **Interview Prep** page with placeholder interview planning output
- **Reusable UI components** and shared layout/navigation
- **Shared AI service abstraction** ready to connect to a real LLM/provider
- **Netlify-ready** configuration for SPA routing

## Tech Stack

- React
- Vite
- React Router
- Plain CSS (component-consistent design system)

## Project Structure

```text
src/
  components/
    AiGeneratorForm.jsx
    AiOutputCard.jsx
    FeatureCard.jsx
    PageHeader.jsx
    SiteLayout.jsx
  pages/
    CoverLetterPage.jsx
    HomePage.jsx
    InterviewPrepPage.jsx
    ResumeBuilderPage.jsx
  services/
    aiAssistant.js
  App.jsx
  index.css
  main.jsx
netlify.toml
```

## Local Setup

### Prerequisites

- Node.js 20+ (or a current LTS version)
- npm

### Install and run

```bash
npm install
npm run dev
```

The app runs locally at the URL shown by Vite (typically `http://localhost:5173`).

## Available Scripts

- `npm run dev` – start development server
- `npm run build` – create production build in `dist/`
- `npm run preview` – preview production build locally
- `npm run lint` – run ESLint checks

## Netlify Deployment

This repository includes a `netlify.toml` file with the required settings:

- Build command: `npm run build`
- Publish directory: `dist`
- SPA redirect rule to `index.html` for client-side routes

### Deploy via Netlify UI

1. Create a new site from Git in Netlify.
2. Connect this GitHub repository.
3. Netlify will detect `netlify.toml` automatically.
4. Trigger deploy.

### Deploy via Netlify CLI (optional)

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --build --prod
```

## Future AI Integration

Placeholder generation currently uses `src/services/aiAssistant.js`.

To connect a real AI provider later:

1. Replace mock logic in `aiAssistant.js` with API calls.
2. Add environment variables for API keys (never hardcode secrets).
3. Route requests through a secure backend/serverless function if needed.

## Screenshot References

- Home page: https://github.com/user-attachments/assets/1c04714a-cf0f-494f-829b-c25a17e97184
- Resume flow: https://github.com/user-attachments/assets/01e6c89f-8553-4fc0-a30c-438ee4798193
