import Countdown from './Countdown'
import { fmt } from '../data'

export default function Hero({ next, onRegister }) {
  return (
    <section className="grid items-center gap-10 px-4 py-12 sm:px-[5vw] sm:py-24 lg:grid-cols-[1.2fr_.8fr] lg:gap-16">
      <div>
        <h1 className="max-w-[15ch] text-[clamp(2.3rem,5.4vw,4.4rem)] font-extrabold">Find the night, the workshop, the weekend worth showing up for.</h1>
        <p className="my-5 max-w-[46ch] text-lg text-muted">Browse upcoming events across the city, pick one, and get your ticket in under a minute.</p>
        <div className="flex flex-wrap gap-3">
          <a href="#events" className="rounded-full border-2 border-accent bg-accent px-6 py-3 font-bold text-accent-ink transition hover:-translate-y-0.5 hover:shadow-lg">Browse events</a>
          {next && <button onClick={() => onRegister(next.id)} className="rounded-full border-2 border-ink px-6 py-3 font-bold transition hover:-translate-y-0.5">Register for the next one</button>}
        </div>
      </div>
      <aside className="animate-drop relative rounded-[18px] bg-stub p-7 text-stub-ink shadow-xl lg:rotate-[1.5deg]">
        <i className="absolute -left-3 top-[62%] size-6 rounded-full bg-bg" /><i className="absolute -right-3 top-[62%] size-6 rounded-full bg-bg" />
        {next ? (<>
          <small className="opacity-70">Next up · {fmt(next.date, { day: 'numeric', month: 'long' })}</small>
          <h2 className="mb-1 mt-1 text-2xl font-extrabold">{next.title}</h2>
          <p className="mb-5 text-sm opacity-75">{next.venue}</p>
          <Countdown iso={next.date} big />
        </>) : <h2 className="text-2xl font-extrabold">No upcoming events</h2>}
      </aside>
    </section>
  )
}
