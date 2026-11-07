import { useNow } from '../hooks'
import { timeLeft } from '../data'

export default function Countdown({ iso, big }) {
  const t = timeLeft(iso, useNow())
  if (!big) return <p className="font-bold text-teal">{new Date(iso) > Date.now() ? `Starts in ${t.Days}d ${t.Hours}h ${t.Mins}m ${t.Secs}s` : 'This event has started'}</p>
  return (
    <div className="grid grid-cols-4 gap-2 border-t-2 border-dashed border-current/30 pt-5 text-center">
      {Object.entries(t).map(([k, v]) => (
        <div key={k}><strong className="block font-head text-3xl font-extrabold tabular-nums">{String(v).padStart(2, '0')}</strong><span className="text-xs opacity-70">{k}</span></div>
      ))}
    </div>
  )
}
