export async function GET(request,{params}){
  const {slug}=params;
  const url=process.env.KV_REST_API_URL||process.env.UPSTASH_REDIS_REST_URL;
  const token=process.env.KV_REST_API_TOKEN||process.env.UPSTASH_REDIS_REST_TOKEN;
  if(!url||!token){ return new Response(JSON.stringify({ok:false,error:"env_missing_kv"}),{status:500,headers:{"Content-Type":"application/json"}}); }
  try{
    const r=await fetch(`${url}/get/player:${slug}`,{headers:{Authorization:`Bearer ${token}`}});
    const data=await r.json();
    if(data&&data.result){ return new Response(JSON.stringify({ok:true,player:JSON.parse(data.result)}),{status:200,headers:{"Content-Type":"application/json"}}); }
    return new Response(JSON.stringify({ok:false,error:"not_found"}),{status:404,headers:{"Content-Type":"application/json"}});
  }catch{
    return new Response(JSON.stringify({ok:false,error:"server_error"}),{status:500,headers:{"Content-Type":"application/json"}});
  }
}