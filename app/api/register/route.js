export async function POST(request) {
  try {
    const body = await request.json();
    const { nickname, platform, contact } = body || {};
    // If Telegram env configured, send message to Telegram
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (token && chatId) {
      const text = `Заявка на участие:%0AНик: ${encodeURIComponent(nickname)}%0AПлатформа: ${encodeURIComponent(platform)}%0AКонтакт: ${encodeURIComponent(contact)}`;
      const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${text}`;
      await fetch(url, { method: "GET" });
    }
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { "Content-Type":"application/json" } });
  } catch (e) {
    return new Response(JSON.stringify({ ok:false, error:"bad_request" }), { status: 400, headers: {"Content-Type":"application/json"} });
  }
}