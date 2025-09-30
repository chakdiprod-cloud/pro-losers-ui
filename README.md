# Pro Losers UI — v12 (Accounts + Dashboard)
Next.js 14 + Tailwind + NextAuth (Credentials). Upstash KV — хранение пользователей и регистраций.

## Новое
- Регистрация/вход: /sign-up и /sign-in (NextAuth Credentials).
- Личный кабинет: /dashboard — список моих заявок.
- Подача заявки требует авторизации; сохранение связывается с userId.
- Эндпоинт /api/my/registrations.

## ENV (Vercel → Settings → Environment Variables)
- NEXTAUTH_SECRET (любой длинный случайный текст)
- KV_REST_API_URL + KV_REST_API_TOKEN **или** UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN

## Проверка
- GET /api/test-kv — health-check KV
- /sign-up → /sign-in → /tournament (подать заявку) → /dashboard
