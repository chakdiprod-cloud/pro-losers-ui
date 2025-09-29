"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";
import { Zap } from "lucide-react";

const tabs = ["Обзор", "Сетка", "Матчи", "Игроки", "Правила", "Участвовать"];

export default function TournamentPage() {
  const [active, setActive] = useState("Обзор");
  const [notice, setNotice] = useState(null);

  async function submitForm(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    if (!payload.nickname || !payload.platform || !payload.contact || !payload.agree) {
      setNotice({type:"error", text:"Заполни все поля и подтверди согласие."});
      return;
    }
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Bad response");
      setNotice({type:"ok", text:"Заявка отправлена! Мы свяжемся с тобой."});
      e.currentTarget.reset();
    } catch (err) {
      setNotice({type:"error", text:"Не удалось отправить. Попробуй позже."});
    }
  }

  return (
    <main className="min-h-screen bg-bgdeep text-white px-6 py-10 container">
      <div className="flex items-center justify-between mb-8">
        <Link href="/" className="text-gray-300 hover:text-white">&larr; На главную</Link>
        <Button onClick={()=>setActive("Участвовать")} className="bg-primary hover:bg-accent relative overflow-hidden">
          Участвовать
          <motion.span className="absolute inset-0 pointer-events-none" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <Zap className="absolute right-2 top-2 w-4 h-4" />
          </motion.span>
        </Button>
      </div>

      <header className="mb-6">
        <h1 className="text-4xl font-extrabold">Кубок Pro Losers — #1</h1>
        <p className="text-gray-400 mt-2">Платформа: PS | Формат: Single Elimination | Призовой: 10 000 ₽</p>
      </header>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActive(t)}
            className={`px-4 py-2 rounded-2xl border ${active === t ? "bg-primary text-black" : "border-white/10 hover:bg-white/5"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {active === "Обзор" && (
        <section className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-panel rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-3">Описание</h3>
            <p className="text-gray-300">Онлайн-турнир по EA FC. Регистрация до 12:00, старт в 13:00 (MSK). Матчи BO1, финал BO3.</p>
            <ul className="list-disc list-inside mt-4 text-gray-300">
              <li>Дедлайн подтверждения результата: 10 минут после матча</li>
              <li>Связь: Telegram / Discord</li>
              <li>Арбитраж при споре — организатор</li>
            </ul>
          </div>
          <aside className="bg-panel rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-3">Инфо</h3>
            <div className="grid grid-cols-2 gap-2 text-gray-300">
              <span>Слоты:</span><span>32</span>
              <span>Зарегистрировано:</span><span>18</span>
              <span>Статус:</span><span>Идёт регистрация</span>
              <span>Старт:</span><span>Сегодня, 13:00</span>
            </div>
          </aside>
        </section>
      )}

      {active === "Сетка" && (
        <section className="bg-panel rounded-2xl p-6 overflow-x-auto">
          <h3 className="text-xl font-semibold mb-4">Сетка — Single Elimination</h3>
          <div className="min-w-[980px] grid grid-cols-4 gap-10">
            {["1/8","1/4","1/2","Финал"].map((round, col)=> (
              <div key={round} className="relative">
                <div className="text-gray-400 mb-2">{round}</div>
                <div className="space-y-6">
                  {[...Array(col===0?8:col===1?4:col===2?2:1)].map((_,i)=>(
                    <div key={i} className="relative p-3 rounded-xl bg-[#2a2b2f]">
                      <div>Игрок A</div>
                      <div>Игрок B</div>
                      {/* connectors */}
                      {col<3 && (
                        <div className="absolute right-[-20px] top-1/2 w-5 h-px bg-white/20" />
                      )}
                    </div>
                  ))}
                </div>
                {/* vertical connectors */}
                {col<3 && (
                  <div className="absolute right-[-20px] top-6 w-px h-[calc(100%-2rem)] bg-gradient-to-b from-white/20 via-transparent to-white/20" />
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {active === "Матчи" && (
        <section className="bg-panel rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4">Ближайшие матчи</h3>
          <div className="space-y-3">
            {[1,2,3].map((m)=>(
              <div key={m} className="p-3 rounded-xl bg-[#2a2b2f] flex items-center justify-between">
                <span>Player{m} vs Player{m+3}</span>
                <span className="text-sm text-gray-400">Сегодня, 14:{10+m} MSK</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {active === "Игроки" && (
        <section className="bg-panel rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4">Участники (18/32)</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[...Array(18)].map((_,i)=>(
              <div key={i} className="p-3 rounded-xl bg-[#2a2b2f]">Player{i+1}</div>
            ))}
          </div>
        </section>
      )}

      {active === "Правила" && (
        <section className="bg-panel rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-3">Основные правила</h3>
          <ol className="list-decimal list-inside text-gray-300 space-y-1">
            <li>Отключить паузы в первые 10 минут.</li>
            <li>Скриншот результата обязателен.</li>
            <li>Техническая победа — при опоздании на 10 минут.</li>
          </ol>
        </section>
      )}

      {active === "Участвовать" && (
        <section id="join" className="bg-panel rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4">Заявка на участие</h3>
          {notice && (
            <div className={`mb-4 rounded-xl px-4 py-3 ${notice.type==="ok"?"bg-green-600/20 text-green-300":"bg-red-600/20 text-red-300"}`}>
              {notice.text}
            </div>
          )}
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
          <p className="text-xs text-gray-500 mt-3">Если интегрировать Telegram-бота, заявки будут приходить в чат автоматически.</p>
        </section>
      )}
    </main>
  );
}
