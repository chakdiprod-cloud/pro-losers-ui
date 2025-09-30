"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "../../components/ui/button";

const tabs = ["Обзор", "Сетка", "Игроки", "Участвовать"];

export default function TournamentPage() {
  const [active, setActive] = useState("Обзор");
  const [players, setPlayers] = useState([]);
  const [notice, setNotice] = useState(null);

  async function refresh() {
    try { const r = await fetch("/api/players"); const d = await r.json(); setPlayers(d.items||[]); } catch {}
  }
  useEffect(()=>{ refresh(); }, []);

  async function submitForm(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    if (!payload.nickname || !payload.platform || !payload.contact || !payload.agree) {
      setNotice({type:"error", text:"Заполни все поля и подтверди согласие."});
      return;
    }
    try {
      const res = await fetch("/api/register", { method:"POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify(payload) });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error();
      setNotice({type:"ok", text:"Заявка отправлена!"});
      e.currentTarget.reset();
      await refresh();
      setActive("Игроки");
    } catch { setNotice({type:"error", text:"Не удалось отправить. Попробуй позже."}); }
  }

  return (
    <main className="min-h-screen bg-bgdeep text-white px-6 py-10 container">
      <div className="flex items-center justify-between mb-8">
        <Link href="/" className="text-gray-300 hover:text-white">&larr; На главную</Link>
        <Button onClick={()=>setActive("Участвовать")} className="bg-primary hover:bg-accent">Участвовать</Button>
      </div>

      <header className="mb-6">
        <h1 className="text-4xl font-extrabold">Кубок Pro Losers — #1</h1>
        <p className="text-gray-400 mt-2">Формат: Single Elimination</p>
      </header>

      <div className="flex gap-2 mb-8 flex-wrap">
        {tabs.map(t => <button key={t} onClick={()=>setActive(t)} className={`px-4 py-2 rounded-2xl border ${active===t ? "bg-primary text-black":"border-white/10 hover:bg-white/5"}`}>{t}</button>)}
      </div>

      {active==="Обзор" && <section className="bg-panel rounded-2xl p-6">Онлайн-турнир по EA FC. Регистрация открыта.</section>}

      {active==="Сетка" && <section className="bg-panel rounded-2xl p-6">Сетка появится после жеребьёвки.</section>}

      {active==="Игроки" && (
        <section className="bg-panel rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4">Участники ({players.length})</h3>
          {players.length===0 ? <div className="text-gray-400">Пока никто не зарегистрировался.</div> : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {players.map(p=> (
                <Link key={p.slug} href={`/players/${p.slug}`} className="p-3 rounded-xl bg-[#2a2b2f] hover:bg-white/5">
                  <div className="font-semibold">{p.nickname}</div>
                  <div className="text-gray-400 text-sm">{p.platform}</div>
                  <div className="text-gray-500 text-xs mt-1">{p.time}</div>
                </Link>
              ))}
            </div>
          )}
        </section>
      )}

      {active==="Участвовать" && (
        <section id="join" className="bg-panel rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4">Заявка на участие</h3>
          {notice && <div className={`mb-4 rounded-xl px-4 py-3 ${notice.type==="ok"?"bg-green-600/20 text-green-300":"bg-red-600/20 text-red-300"}`}>{notice.text}</div>}
          <form onSubmit={submitForm} className="grid md:grid-cols-2 gap-4">
            <label className="flex flex-col gap-2">
              <span className="text-sm text-gray-300">Игровой ник*</span>
              <input name="nickname" className="bg-[#2a2b2f] rounded-xl px-3 py-2 outline-none" placeholder="ProLoser_77" />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm text-gray-300">Платформа*</span>
              <select name="platform" className="bg-[#2a2b2f] rounded-xl px-3 py-2 outline-none">
                <option value="">Выбери платформу</option>
                <option value="PS">PS</option>
                <option value="Xbox">Xbox</option>
                <option value="PC">PC</option>
              </select>
            </label>
            <label className="flex flex-col gap-2 md:col-span-2">
              <span className="text-sm text-gray-300">Контакт (Telegram/Discord)*</span>
              <input name="contact" className="bg-[#2a2b2f] rounded-xl px-3 py-2 outline-none" placeholder="@nickname или user#0001" />
            </label>
            <label className="flex items-start gap-2 md:col-span-2">
              <input type="checkbox" name="agree" value="yes" className="mt-1" />
              <span className="text-sm text-gray-400">Согласен с правилами турнира и обработкой данных</span>
            </label>
            <div className="md:col-span-2">
              <Button type="submit" className="bg-primary hover:bg-accent">Отправить заявку</Button>
            </div>
          </form>
        </section>
      )}
    </main>
  );
}
