import express from "express";
import cors from "cors";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { pictures } from "./pictures.js";import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.get("/api/pictures", (_req, res) => res.json(pictures));
app.use("/images", express.static(path.join(__dirname, "public", "images")));

const server = createServer(app);
const wss = new WebSocketServer({ server, path: "/ws" });

/** rooms: pictureId -> Set<WebSocket> */
const rooms = new Map();

wss.on("connection", (ws, req) => {
  const url = new URL(req.url, "http://localhost");
  const pictureId = url.searchParams.get("pictureId") || "lobby";
  if (!rooms.has(pictureId)) rooms.set(pictureId, new Set());
  rooms.get(pictureId).add(ws);

  ws.on("message", (raw) => {
    let msg;
    try { msg = JSON.parse(raw); } catch { return; }
    const peers = rooms.get(msg.pictureId) || new Set();
    for (const client of peers) {
      if (client.readyState === 1) client.send(JSON.stringify(msg));
    }
  });

  ws.on("close", () => rooms.get(pictureId)?.delete(ws));
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log("API on :4000, WS on /ws"));
