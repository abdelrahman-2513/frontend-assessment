const app = require('./app');

const PORT = process.env.PORT || 4000;

// Only start a long-running server locally / in Docker.
// On Vercel, the platform imports `src/app.js` as the serverless handler.
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

module.exports = app;
