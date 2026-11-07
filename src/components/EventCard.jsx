import { art, fmt, priceText } from '../data'

export default function EventCard({ e, i, onOpen }) {
  return (
    <button onClick={() => onOpen(e.id)} aria-label={`View details for ${e.title}`} style={{ animationDelay: `${i * 40}ms` }}
      className="animate-pop flex flex-col overflow-hidden rounded-[18px] bg-surface text-left shadow-lg transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl">
      <div className="relative aspect-[16/10] bg-cover" style={{ backgroundImage: art(e) }}>
        <div className="absolute left-3.5 top-3.5 rounded-xl bg-surface px-3 py-1.5 text-center font-head text-xl font-extrabold leading-none">
          {fmt(e.date, { day: 'numeric' })}<small className="block font-sans text-[11px] font-bold text-teal">{fmt(e.date, { month: 'short' }).toUpperCase()}</small>
        </div>
        <span className="absolute right-3.5 top-3.5 rounded-full bg-ink px-3 py-1 text-xs font-medium text-bg">{e.cat}</span>
      </div>
      <div className="relative flex flex-1 flex-col gap-2 border-t-2 border-dashed border-line p-5">
        <i className="absolute -left-3 -top-3.5 size-6 rounded-full bg-bg" /><i className="absolute -right-3 -top-3.5 size-6 rounded-full bg-bg" />
        <h3 className="text-xl font-bold">{e.title}</h3>
        <div className="text-sm text-muted">{e.venue}</div>
        <p className="flex-1 text-[.95rem] text-muted">{e.desc}</p>
        <div className="mt-1.5 flex justify-between font-bold"><span>{priceText(e.price)}</span><span className="text-teal">View and register</span></div>
      </div>
    </button>
  )
}
