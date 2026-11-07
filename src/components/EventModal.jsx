import { useEffect, useRef, useState } from 'react'
import { EVENTS, art, fmt, priceText, rules } from '../data'
import Countdown from './Countdown'

const Field = ({ label, error, ok, children }) => (
  <div className="mb-3.5">
    <label className="mb-1.5 block text-sm font-bold">{label}</label>
    {children(`w-full rounded-xl border-[1.5px] bg-surface px-4 py-3 outline-none transition focus:ring-4 focus:ring-accent/25 ${error ? 'border-danger' : ok ? 'border-teal' : 'border-line focus:border-accent'}`)}
    <small className="mt-1 block min-h-[1.2em] text-sm text-danger">{error}</small>
  </div>
)

export default function EventModal({ event, regs, onClose, onRegister, goTickets }) {
  const ref = useRef()
  const [vals, setVals] = useState({ name: '', email: '', phone: '', event: String(event.id) })
  const [touched, setTouched] = useState({})
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(null)
  const [dupe, setDupe] = useState('')
  const ev = EVENTS.find((x) => x.id === +vals.event) || event

  useEffect(() => { ref.current.showModal() }, [])

  const err = (k) => (touched[k] ? rules[k](vals[k]) || (k === 'email' && dupe) : '')
  const set = (k) => (e) => { setVals({ ...vals, [k]: e.target.value }); setTouched({ ...touched, [k]: true }); setDupe('') }

  const submit = (e) => {
    e.preventDefault()
    setTouched({ name: true, email: true, phone: true, event: true })
    if (Object.keys(rules).some((k) => rules[k](vals[k]))) return
    if (regs.some((r) => r.eventId === +vals.event && r.email.toLowerCase() === vals.email.trim().toLowerCase())) return setDupe('This email is already registered for this event.')
    setBusy(true)
    setTimeout(() => {
      const ref = 'GTH-' + Math.random().toString(36).slice(2, 8).toUpperCase()
      onRegister({ ref, eventId: +vals.event, name: vals.name.trim(), email: vals.email.trim(), phone: vals.phone.trim() })
      setDone(ref); setBusy(false)
    }, 600)
  }

  return (
    <dialog ref={ref} onClose={onClose} onClick={(e) => e.target === ref.current && ref.current.close()}
      className="animate-rise m-auto max-h-[92vh] w-[min(900px,94vw)] overflow-auto rounded-3xl bg-surface p-0 text-ink shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm">
      <button onClick={() => ref.current.close()} aria-label="Close" className="absolute right-3.5 top-3 z-10 size-10 rounded-full bg-surface text-2xl leading-none">&times;</button>
      <div className="h-48 bg-cover" style={{ backgroundImage: art(ev) }} />
      <div className="grid gap-8 p-7 md:grid-cols-2">
        <div>
          <span className="mb-2.5 inline-block rounded-full bg-ink px-3 py-1 text-xs text-bg">{ev.cat}</span>
          <h2 className="mb-2.5 text-3xl font-extrabold">{ev.title}</h2>
          <p className="text-muted">{ev.long}</p>
          <dl className="my-4 grid gap-1.5 border-y border-dashed border-line py-3.5">
            {[['Date', fmt(ev.date, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })], ['Time', new Date(ev.date).toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' })], ['Venue', ev.venue], ['Price', priceText(ev.price)]].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-3"><dt className="text-muted">{k}</dt><dd className="text-right font-bold">{v}</dd></div>
            ))}
          </dl>
          <Countdown iso={ev.date} />
        </div>
        <div>
          {done ? (
            <div className="animate-rise py-3 text-center">
              <div className="mx-auto mb-3.5 grid size-16 place-items-center rounded-full bg-teal text-3xl text-white">✓</div>
              <h3 className="mb-1.5 text-xl font-bold">You're registered, {vals.name.trim().split(' ')[0]}</h3>
              <p className="text-muted">{ev.title} on {fmt(ev.date, { day: 'numeric', month: 'long', year: 'numeric' })}. A confirmation will be sent to {vals.email}.</p>
              <code className="my-3 inline-block rounded-lg border-[1.5px] border-dashed border-teal px-3.5 py-1.5 font-bold text-teal">{done}</code><br />
              <button onClick={() => { ref.current.close(); goTickets() }} className="rounded-full bg-accent px-6 py-3 font-bold text-accent-ink">View my tickets</button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <h3 className="mb-3.5 text-xl font-bold">Register</h3>
              <Field label="Full name" error={err('name')} ok={touched.name}>{(c) => <input className={c} value={vals.name} onChange={set('name')} autoComplete="name" />}</Field>
              <Field label="Email address" error={err('email')} ok={touched.email}>{(c) => <input className={c} type="email" value={vals.email} onChange={set('email')} autoComplete="email" />}</Field>
              <Field label="Phone number" error={err('phone')} ok={touched.phone}>{(c) => <input className={c} type="tel" inputMode="numeric" placeholder="10-digit mobile number" value={vals.phone} onChange={set('phone')} autoComplete="tel" />}</Field>
              <Field label="Event" error={err('event')} ok={touched.event}>{(c) => (
                <select className={c} value={vals.event} onChange={set('event')}>
                  <option value="">Select an event</option>
                  {EVENTS.map((x) => <option key={x.id} value={x.id}>{x.title}</option>)}
                </select>)}</Field>
              <button disabled={busy} className="w-full rounded-full bg-accent px-6 py-3 font-bold text-accent-ink transition hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60">{busy ? 'Registering…' : 'Register now'}</button>
            </form>
          )}
        </div>
      </div>
    </dialog>
  )
}
