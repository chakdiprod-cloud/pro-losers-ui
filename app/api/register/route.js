export async function GET() {
  const url =
    process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token =
    process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return new Response(JSON.stringify({ ok: false, error: "env_missing" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    // write
    const setRes = await fetch(`${url}/set/_pl_ping/ok`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    // read
    const getRes = await fetch(`${url}/get/_pl_ping`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const getData = await getRes.json();

    return new Response(
      JSON.stringify({ ok: true, setStatus: setRes.status, get: getData }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: "kv_request_failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
