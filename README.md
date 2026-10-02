# twofoldtwins

Portfolio website of twofoldtwins.

## Layout

| Path | What it is |
| --- | --- |
| `src/` | The main site (Create React App) served at `/` |
| `khush/` | Khushvardhan's personal portfolio, a separate CRA app served at `/khush` |
| `api/send-email.js` | Serverless function behind both contact forms |
| `public/khush/` | **Generated** — the built output of `khush/`, committed so the root build ships it |

## Running the main site

```bash
npm install
npm start
```

## The `/khush` portfolio

`/khush` is a second CRA app with its own dependencies, built with
`homepage: "/khush"` and committed into `public/khush/` as static assets. The
root build copies `public/` verbatim, so the portfolio ships with the main site.

Edit it in `khush/src/`, then rebuild and copy the output into place:

```bash
cd khush && npm install && npm run deploy
```

`npm run deploy` runs the production build and copies `khush/build` over
`public/khush`. Commit the regenerated `public/khush/` along with your source
changes — editing `public/khush/` by hand will be overwritten on the next build.

To iterate with hot reload instead, run `cd khush && npm start`. The contact
form posts to the root site's `/api/send-email`, so run `vercel dev` in the
repo root alongside it if you want submissions to work in development.

## Contact form / email

Both contact forms POST to `/api/send-email`, a Vercel serverless function. It
lives in the top-level `api/` directory (not `pages/api/`) because this is a CRA
project, not Next.js — Vercel only picks up functions from `api/` here.

Submissions are routed by the `source` field the form sends:

| `source` | Delivered to |
| --- | --- |
| `khush` (the `/khush` portfolio) | `khushvardhanbhardwaj@gmail.com` |
| `twofoldtwins` (the main site) | `twofoldtwins.inc@gmail.com`, cc `khushvardhanbhardwaj@gmail.com` |

Mail is sent through Gmail with nodemailer, which needs two environment
variables set in the Vercel project (see `.env.example`):

- `EMAIL_USER` — the sending Gmail address
- `EMAIL_APP_PASSWORD` — a [Gmail App Password](https://myaccount.google.com/apppasswords), not the account password

Without them the endpoint returns a clear 500 instead of silently failing.
