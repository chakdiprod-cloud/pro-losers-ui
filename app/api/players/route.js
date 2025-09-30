export async function GET(){
  const url=process.env.KV_REST_API_URL||process.env.UPSTASH_REDIS_REST_URL;
  const token=process.env.KV_REST_API_TOKEN||process.env.UPSTASH_REDIS_REST_TOKEN;
  if(!url||!token){
    return new Response(JSON.stringify({ok:true,items:[],warning:"env_missing_kv"}),{status:200,headers:{"Content-Type":"application/json"}});
  }
  try{
    let items=[];
    const r=await fetch(`${url}/lrange/players_list/0/200`,{headers:{Authorization:`Bearer ${token}`}});
    const data=await r.json();
    if(Array.isArray(data.result)){items=data.result.map(x=>{try{return JSON.parse(x)}catch{return null}}).filter(Boolean);}
    items.sort((a,b)=>(b.ts||0)-(a.ts||0));
    items=items.map(({slug,nickname,platform,time})=>({slug,nickname,platform,time}));
    return new Response(JSON.stringify({ok:true,items}),{status:200,headers:{"Content-Type":"application/json"}});
  }catch{
    return new Response(JSON.stringify({ok:false,error:"kv_request_failed"}),{status:500,headers:{"Content-Type":"application/json"}});
  }
}