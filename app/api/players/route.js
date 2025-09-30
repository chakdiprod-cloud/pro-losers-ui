export async function GET() {
  try {
    const kvUrl   = process.env.KV_REST_API_URL   || process.env.UPSTASH_REDIS_REST_URL;
    const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
    let items = [];
    if (kvUrl && kvToken) {
      const r = await fetch(`${kvUrl}/lrange/players_list/0/200`, { headers: { Authorization: `Bearer ${kvToken}` } });
      const data = await r.json();
      if (Array.isArray(data.result)) {
        items = data.result.map(x=>{ try { return JSON.parse(x); } catch { return null; }}).filter(Boolean);
      }
    }
    items.sort((a,b)=> (b.ts||0)-(a.ts||0));
    // public fields only
    items = items.map(({slug, nickname, platform, time}) => ({slug, nickname, platform, time}));
    return new Response(JSON.stringify({ ok:true, items }), { status: 200, headers: {"Content-Type":"application/json"} });
  } catch {
    return new Response(JSON.stringify({ ok:false }), { status: 500, headers: {"Content-Type":"application/json"} });
  }
}