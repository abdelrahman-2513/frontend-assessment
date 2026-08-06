## Installation Steps

1. Navigate to the backend folder `cd backend`
2. Install the dependencies `npm i`
3. Run the server `npm run start`

It will be available on `http://localhost:4000`

### Environment

- `PORT` — server port (default `4000`)
- `DATA_DIR` — directory for `tasks.json` / `activity.json` (default `./data`)

### Vercel

- Config: `vercel.json` (Express app via `@vercel/node`)
- Data files auto-use `/tmp/veeliion-data` when `VERCEL=1` (or set `DATA_DIR` yourself)
- Health check: `GET /health`
- Note: JSON data on serverless is **not durable** across cold starts
