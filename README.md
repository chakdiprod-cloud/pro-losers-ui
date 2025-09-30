# v9 — Player pages (no Telegram)
- Registration writes to Vercel KV (players_list + player:<slug>)
- Public list: GET /api/players
- Player profile: GET /api/players/[slug]
- UI: /tournament shows list and join form; /players and /players/[slug] pages
- No Telegram integration required (code removed)
Env needed: KV_REST_API_URL, KV_REST_API_TOKEN
