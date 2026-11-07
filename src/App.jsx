import { useEffect, useMemo, useState } from 'react'
import { CATS, EVENTS, fmt } from './data'
import { useLocalStorage } from './hooks'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import EventCard from './components/EventCard'
import EventModal from './components/EventModal'

export default function App() {
  const [theme, setTheme] = useLocalStorage('evento-theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light')
  const [regs, setRegs] = useLocalStorage('evento-registrations', [])
  const [cat, setCat] = useState('All')
  const [q, setQ] = useState('')
  const [openId, setOpenId] = useState(null)
  const [toast, setToast] = useState('')

  useEffect(() => { document.documentElement.classList.toggle('dark', theme === 'dark') }, [theme])
  useEffect(() => { if (toast) { const t = setTimeout(() => setToast(''), 2200); return () => clearTimeout(t) } }, [toast])

  const next = useMemo(() => [...EVENTS].filter((e) => new Date(e.date) > new Date()).sort((a, b) => new Date(a.date) - new Date(b.date))[0], [])
  const list = EVENTS.filter((e) => (cat === 'All' || e.cat === cat) && (!q.trim() || [e.title, e.venue, e.desc, e.cat].join(' ').toLowerCase().includes(q.toLowerCase().trim())))
  const clear = () => { setCat('All'); setQ('') }

  return (
    <div id="top">
      <Navbar dark={theme === 'dark'} toggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} count={regs.length} />
      <main>
        <Hero next={next} onRegister={setOpenId} />

        <section id="events" className="px-4 py-12 sm:px-[5vw] sm:py-16">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-[clamp(1.8rem,3.5vw,2.6rem)] font-extrabold">Upcoming events</h2>
            <p className="text-muted">Showing {list.length} of {EVENTS.length} events</p>
          </div>
          <div className="mb-8 flex flex-wrap items-center gap-4">
            <label className="min-w-[260px] flex-1">
              <span className="sr-only">Search events</span>
              <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name, venue or keyword"
                className="w-full rounded-xl border-[1.5px] border-line bg-surface px-4 py-3 outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/25" />
            </label>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
              {CATS.map((c) => (
                <button key={c} aria-pressed={cat === c} onClick={() => setCat(c)}
                  className={`rounded-full border-[1.5px] px-4 py-2 text-sm font-medium transition ${cat === c ? 'border-ink bg-ink text-bg' : 'border-line bg-surface hover:border-ink'}`}>{c}</button>
              ))}
            </div>
          </div>
          {list.length ? (
            <div className="grid gap-6 [grid-template-columns:repeat(auto-fill,minmax(290px,1fr))]">
              {list.map((e, i) => <EventCard key={e.id} e={e} i={i} onOpen={setOpenId} />)}
            </div>
          ) : (
            <div className="py-14 text-center">
              <h3 className="text-xl font-bold">No events match that search</h3>
              <p className="mb-5 mt-2 text-muted">Try a different word or clear the category filter.</p>
              <button onClick={clear} className="rounded-full bg-accent px-6 py-3 font-bold text-accent-ink">Show all events</button>
            </div>
          )}
        </section>

        <section id="my" className="px-4 py-12 sm:px-[5vw] sm:py-16">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-[clamp(1.8rem,3.5vw,2.6rem)] font-extrabold">My tickets</h2>
            <p className="text-muted">Saved on this device.</p>
          </div>
          {regs.length ? (
            <div className="grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(270px,1fr))]">
              {regs.map((r) => {
                const e = EVENTS.find((x) => x.id === r.eventId)
                return (
                  <div key={r.ref} className="animate-pop flex flex-col gap-1 rounded-[18px] border-[1.5px] border-dashed border-line bg-surface p-5">
                    <b className="font-head text-lg font-extrabold">{e.title}</b>
                    <small className="text-muted">{fmt(e.date, { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })}</small>
                    <small className="text-muted">{r.name} · {r.email}</small>
                    <code className="font-bold text-teal">{r.ref}</code>
                    <button onClick={() => { setRegs(regs.filter((x) => x.ref !== r.ref)); setToast('Registration cancelled') }} className="mt-2 self-start text-sm font-bold text-danger underline">Cancel registration</button>
                  </div>
                )
              })}
            </div>
          ) : <p className="text-muted">You have no tickets yet. Pick an event above to register.</p>}
        </section>

        <section id="about" className="px-4 py-12 sm:px-[5vw] sm:py-16">
          <h2 className="mb-7 max-w-[20ch] text-[clamp(1.8rem,3.5vw,2.6rem)] font-extrabold">Built for people who just want to go</h2>
          <div className="grid gap-8 text-muted [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
            <p><strong className="block font-head text-lg font-extrabold text-ink">Search and filter.</strong> Narrow events by keyword or category and see results update instantly.</p>
            <p><strong className="block font-head text-lg font-extrabold text-ink">Clear details.</strong> Every event shows date, venue, price, what to expect and how long until it starts.</p>
            <p><strong className="block font-head text-lg font-extrabold text-ink">Quick registration.</strong> One short form, checked as you type, and a ticket you can find again later.</p>
          </div>
        </section>
      </main>

      <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-7 text-sm text-muted sm:px-[5vw]">
        <span>Evento © {new Date().getFullYear()}</span>
        <a href="#top" className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-line bg-surface px-4 py-2 font-medium text-ink transition hover:-translate-y-0.5 hover:border-ink">
          Back to top <span aria-hidden="true">↑</span>
        </a>
      </footer>

      {openId && <EventModal key={openId} event={EVENTS.find((e) => e.id === openId)} regs={regs} onClose={() => setOpenId(null)}
        onRegister={(r) => setRegs([...regs, r])} goTickets={() => { location.hash = '#my' }} />}
      <div role="status" className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-ink px-5 py-3 font-medium text-bg transition-transform duration-300 ${toast ? 'translate-y-0' : 'translate-y-32'}`}>{toast}</div>
    </div>
  )
}
