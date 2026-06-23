# Woliba User Registration Flow

A multi-step user registration web application built with React.js for the Woliba wellness platform. The app follows the provided Figma design and integrates with the Woliba registration APIs.

## App Overview

This application guides users through an 8-step registration process:

1. **Company Verification** — Verify company name and password
2. **User Details** — Enter email, first name, last name (company name pre-filled)
3. **OTP Verification** — Enter 6-digit OTP with resend timer (3 minutes)
4. **Login Credentials** — Set password, birthday, contact number, accept terms
5. **Wellness Interests** — Multi-select interests from API (accordion categories)
6. **Wellbeing Pillars** — Select exactly 3 pillars with ordered numbering
7. **Registration Loading** — Submits final registration API with loading screen
8. **Welcome Screen** — Success popup with personalized greeting

## Setup Instructions

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
cd woliba-registration
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Test Credentials (from api.txt)
- **Company Name:** Woliba
- **Company Password:** Woliba@123!

The API request sends `company_name` as lowercase (`woliba`) per the sample request in `api.txt`.

### Build for Production

```bash
npm run build
npm run preview
```

## Libraries / Tools Used

| Library | Purpose |
|---------|---------|
| React 19 | UI framework (functional components + hooks) |
| Redux Toolkit | Global state management |
| React Router DOM | Client-side routing |
| Axios | HTTP client for API calls |
| Vite | Build tool and dev server |

## Folder Structure

```
woliba-registration/
├── assets/           # Design assets (logo, background, loader)
├── src/
│   ├── api/
│   ├── components/
│   ├── pages/
│   ├── redux/
│   ├── routes/
│   ├── services/
│   ├── styles/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## API Integration

Base URL: `https://dev.woliba.io/v1/` (called directly from the app)

| Step | Endpoint |
|------|----------|
| Company verify | `POST /verify-by-company-name-and-password` |
| Save user + OTP | `POST /save-user-details-and-send-otp` |
| Verify OTP | `POST /verify-otp-for-user-registration` |
| Resend OTP | `POST /send-otp-for-user-registration` |
| Wellness interests | `GET /viewWellnessInterest` |
| Wellbeing pillars | `GET /get-wellbeing-pillars/1` |
| Complete registration | `POST /user-registration` |

## Deployment Instructions

### Vercel (Recommended)

1. Push the project to a public GitHub repository
2. Go to [vercel.com](https://vercel.com) and import the repository
3. Set root directory to `.` (repository root is the project itself)
4. Build command: `npm run build`
5. Output directory: `dist`
6. Deploy

### Netlify

1. Connect your GitHub repo on [netlify.com](https://netlify.com)
2. Build command: `npm run build`
3. Publish directory: `dist`

## CORS Issue & Mock Data

During development, API calls from `localhost` to `https://dev.woliba.io/v1/` were blocked by **CORS** (Cross-Origin Resource Sharing) in the browser. The backend team was contacted to allow the dev origin, but until that is enabled, the full registration flow cannot be tested end-to-end against the live API from local development.

To continue UI development and Figma comparison without API access, **UI Preview Mode** was added with **mocked values**:

| Mocked item | Value used |
|-------------|------------|
| Company | Woliba |
| User | Shivani Shendkar |
| Email | shivanishendkar@company.com |
| OTP | `724108` |
| Password | Shivani@Woliba |
| Wellness interests | Local mock list (accordion categories) |
| Wellbeing pillars | Local mock list (12 pillars) |
| Registration submit | Skipped — navigates to welcome after loader |

Enable preview in `.env.development`:

```
VITE_DEV_PREVIEW=true
```

Set `VITE_DEV_PREVIEW=false` once CORS is fixed on `dev.woliba.io` to test the real API flow.

## UI Preview Mode (Figma review)

While waiting for CORS from the backend, use **UI Preview Mode** to browse all 8 screens without API calls.

1. Ensure `.env.development` contains:
   ```
   VITE_DEV_PREVIEW=true
   ```
2. Start the dev server:
   ```bash
   npm run dev
   ```
3. Open http://localhost:3000 — a **UI Preview** panel appears bottom-right.
4. Click any step (1–8) to jump directly to that page with mock data pre-filled (matching Figma examples).

Preview mode:
- Skips route guards
- Pre-fills forms (Shivani / Woliba / OTP `724108` / etc.)
- Uses mock wellness interests and wellbeing pillars
- Skips API on submit — navigates to next step locally
- **Only runs in development** — disabled in production builds

To disable preview: set `VITE_DEV_PREVIEW=false` in `.env.development`.

## API Configuration

All API calls go directly to **`https://dev.woliba.io/v1/`** as documented in `api.txt`. No local proxy is used.

Restart the dev server after config changes:

```bash
npm run dev
```

In Chrome DevTools you should see requests to `https://dev.woliba.io/v1/...`, not `http://localhost:3000/v1/...`.

## Assumptions

- **Mock data in preview mode** is used due to CORS blocking API calls from localhost until the backend allows the origin (see [CORS Issue & Mock Data](#cors-issue--mock-data))
- Design assets live in `assets/` at the project root (logo, background, loader video, welcome hero GIF)
- Language selector is UI-only (English default, `language_id: 1` for pillars API)
- Work Anniversary field is optional and not sent to the registration API (not in API spec)
- OTP resend timer is set to 3 minutes per Figma design (API notes 10-minute OTP validity)
- Route guards redirect users to step 1 if required Redux state is missing
- `user_type` is set to `0` (Employee) for all registrations

## Timeline Followed

48 Hours

## AI Tools Used

- **Cursor AI** — Code generation, architecture planning, and implementation assistance

## Screenshots

Screenshots of each registration step should be added to a `/screenshots` folder before submission.
