export async function POST(request) {
  try {
    const body = await request.json();
    const { nickname, platform, contact, website, agree } = body || {};
    if (website) return new Response(JSON.stringify({ ok: true }), { status: 200 });
    if (!nickname || !platform || !contact || !agree) {
      return new Response(JSON.stringify({ ok:false, error:"validation" }), { status: 400, headers: {"Content-Type":"application/json"} });
    }
    // generate slug
    const base = (nickname || "player").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "player";
    const suffix = Math.random().toString(36).slice(2,6);
    const slug = `${base}-${suffix}`;

    const entry = {
      slug, nickname, platform, contact,
      time: new Date().toISOString().replace('T',' ').slice(0,16),
      ts: Date.now()
    };

    const kvUrl   = process.env.KV_REST_API_URL   || process.env.UPSTASH_REDIS_REST_URL;
    const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
    if (kvUrl && kvToken) {
      const json = encodeURIComponent(JSON.stringify(entry));
      await fetch(`${kvUrl}/lpush/players_list/${json}`, { method:"POST", headers: { Authorization: `Bearer ${kvToken}` }});
      await fetch(`${kvUrl}/set/player:${slug}/${json}`, { method:"POST", headers: { Authorization: `Bearer ${kvToken}` }});
    }
    return new Response(JSON.stringify({ ok: true, slug }), { status: 200, headers: {"Content-Type":"application/json"} });
  } catch (e) {
    return new Response(JSON.stringify({ ok:false, error:"bad_request" }), { status: 400, headers: {"Content-Type":"application/json"} });
  }
}