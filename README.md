# AI Creative Studio (Full-stack)

Folders:

- frontend/ (Vite + React + Tailwind + Framer Motion)
- backend/ (Express + JWT + MongoDB/Mongoose with in-memory fallback)

Quick start (local):

```
# Backend
cd backend
cp .env.example .env
npm run dev

# Frontend
cd ../frontend
cp .env.example .env
npm run dev
```

Deployment:

- Frontend: Deploy `frontend/` to Vercel/Netlify. Set `VITE_API_URL` to your backend URL.
- Backend: Deploy `backend/` to Render/Heroku. Set `PORT`, `MONGO_URI`, `JWT_SECRET`, `MOCK_MODE`, `USE_MEMORY_DB=false`, and `FRONTEND_URL` to your frontend origin.

MOCK_MODE:

- `true` returns placeholder PNG/MP4/MP3 and sample lyrics.
- Set to `false` later when integrating real AI providers.