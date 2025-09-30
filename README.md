# Pro Losers UI — v10
Next.js 14 + Tailwind. Регистрация участников, список игроков, персональные страницы.
Хранилище: Upstash Redis (Vercel KV).

## Переменные окружения
ИСПОЛЬЗУЙ ЛЮБУЮ ПАРУ:
- KV_REST_API_URL
- KV_REST_API_TOKEN
ИЛИ
- UPSTASH_REDIS_REST_URL
- UPSTASH_REDIS_REST_TOKEN

## Проверка
- GET /api/test-kv — проверка KV
- /tournament — форма регистрации
- /players — список
- /players/[slug] — профиль
