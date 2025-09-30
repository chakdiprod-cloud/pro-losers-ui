export async function GET(request, { params }) {
  try {
    const { slug } = params;
    const kvUrl   = process.env.KV_REST_API_URL   || process.env.UPSTASH_REDIS_REST_URL;
    const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
    if (kvUrl && kvToken) {
      const r = await fetch(`${kvUrl}/get/player:${slug}`, { headers: { Authorization: `Bearer ${kvToken}` } });
      const data = await r.json();
      if (data && data.result) {
        const obj = JSON.parse(data.result);
        return new Response(JSON.stringify({ ok:true, player: obj }), { status: 200, headers: {"Content-Type":"application/json"} });
      }
    }
    return new Response(JSON.stringify({ ok:false, error:"not_found" }), { status: 404, headers: {"Content-Type":"application/json"} });
  } catch {
    return new Response(JSON.stringify({ ok:false, error:"server_error" }), { status: 500, headers: {"Content-Type":"application/json"} });
  }
}