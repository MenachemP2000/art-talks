# Full-Stack Gallery + Chat App

This project implements a simple gallery application with per-picture discussion rooms.  
Built with **Vue 3 + Vite** on the frontend and **Node.js (Express + WebSockets)** on the backend.  

---

## Features
- **Gallery Page**  
  Displays a grid of pictures with artist name and short description.  
  Includes a **search bar** (case-insensitive) to filter by artist or title.  

- **Picture View**  
  Shows a larger version of the selected picture along with details.  
  Includes a **real-time chat panel** implemented via WebSockets.  
  Each picture has its own chat “room.”  

- **Chat**  
  - Messages are broadcast in real-time to all connected clients.  
  - Schema: `{ pictureId, author, text, ts }`  
  - Connection is established on entering a picture view, and closed on exit.  

- **Bonus Enhancements**  
  - Images are served locally from the backend (`/images/*`).  
  - Tooltip shows image resolution and approximate size.  

---

## Stack & Tools
- **Frontend:** Vue 3, Vite, Vue Router, Pinia (optional for state)  
- **Backend:** Node.js, Express, ws (WebSocket server), CORS  
- **Build/Dev:** npm, TypeScript  

---

## Project Structure
```
.
├── backend
│   ├── server.js          # Express + WebSocket server
│   ├── pictures.js        # Picture metadata
│   └── public/images/     # Local image files
├── frontend
│   ├── index.html
│   ├── vite.config.ts
│   └── src/
│       ├── App.vue
│       ├── main.ts
│       ├── router.ts
│       ├── types.ts
│       ├── components/    # PictureCard, ChatPanel
│       └── pages/         # Gallery, PictureView
└── README.md
```

---

## Installation & Running

### 1. Backend
```bash
cd backend
npm install
npm start
# Runs on http://localhost:4000
```

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

---

## Notes
- All dependencies are listed in `package.json`.  
- Static images are served from `/images/...` via the backend.  
- WebSocket server runs on the same backend (`/ws`).  
