"use client";
import React, { useEffect, useState } from "react";

export default function PlayerPage({ params }) {
  const { slug } = params;
  const [player, setPlayer] = useState(null);
  const [error, setError] = useState(null);
  useEffect(()=>{
    (async()=>{
      try{
        const r = await fetch(`/api/players/${slug}`);
        const d = await r.json();
        if (!r.ok || !d.ok) throw new Error();
        setPlayer(d.player);
      }catch{ setError("Игрок не найден"); }
    })();
  }, [slug]);

  if (error) return <main className="container text-white py-10">{error}</main>;
  if (!player) return <main className="container text-white py-10">Загрузка…</main>;

  return (
    <main className="min-h-screen bg-bgdeep text-white container py-10">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-primary"></div>
        <div>
          <h1 className="text-3xl font-extrabold">{player.nickname}</h1>
          <div className="text-gray-400">Платформа: {player.platform} • Контакт: {player.contact}</div>
          <div className="text-gray-500 text-sm">Регистрация: {player.time}</div>
        </div>
      </div>

      <section className="grid md:grid-cols-2 gap-4">
        <div className="bg-panel rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-2">Статистика</h3>
          <p className="text-gray-400">Матчи, победы и т.д. (позже подключим).</p>
        </div>
        <div className="bg-panel rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-2">О себе</h3>
          <p className="text-gray-400">Короткая био игрока (можно добавить поле в форму).</p>
        </div>
      </section>
    </main>
  );
}
