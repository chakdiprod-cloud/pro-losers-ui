# Pro Losers UI — v11
Next.js 14 + Tailwind. SSR на главной + понятные сообщения по KV.

## Что нового
- Главная (`/`) рендерится сервером (нет `ssr:false`).
- `/api/players` отдаёт 200 и предупреждение, если KV не настроен.
- UI на `/tournament` и `/players` показывает баннер-подсказку.
- `/api/register` явно сообщает `env_missing_kv`.

## Переменные окружения
Используй одну из пар:
- KV_REST_API_URL + KV_REST_API_TOKEN
или
- UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN

## Проверка
- GET /api/test-kv — health-check KV.
- /tournament — форма + список.
- /players — каталог.
- /players/[slug] — профиль.
