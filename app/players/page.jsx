"use client";
import React,{useEffect,useState} from "react";
import Link from "next/link";
export default function Players(){
  const [players,setPlayers]=useState([]);
  const [warning,setWarning]=useState(null);
  useEffect(()=>{(async()=>{try{const r=await fetch("/api/players");const d=await r.json();setPlayers(d.items||[]);if(d.warning==="env_missing_kv") setWarning("Хранилище ещё не настроено: добавь KV переменные и сделай Redeploy");}catch{}})();},[]);
  return (<main className="min-h-screen bg-bgdeep text-white container py-10">
    <h1 className="text-4xl font-extrabold mb-6">Игроки</h1>
    {warning&&<div className="mb-4 rounded-xl px-4 py-3 bg-yellow-500/15 text-yellow-300">{warning}</div>}
    {players.length===0?<div className="text-gray-400">Ещё нет участников.</div>:(
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {players.map(p=>(
          <Link key={p.slug} href={`/players/${p.slug}`} className="p-4 rounded-2xl bg-panel hover:bg-white/5">
            <div className="w-12 h-12 rounded-full bg-primary mb-2"></div>
            <div className="font-semibold">{p.nickname}</div>
            <div className="text-sm text-gray-400">{p.platform}</div>
            <div className="text-xs text-gray-500 mt-1">{p.time}</div>
          </Link>
        ))}
      </div>
    )}
  </main>);
}