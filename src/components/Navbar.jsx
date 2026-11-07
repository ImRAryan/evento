import { useState } from 'react'

export default function Navbar({ dark, toggleTheme, count }) {
  const [open, setOpen] = useState(false)
  const link = 'py-3 sm:py-0 font-medium text-muted hover:text-ink transition-colors'
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-line bg-bg/85 px-4 py-3.5 backdrop-blur-md sm:px-[5vw]">
      <a href="#top" className="flex items-center gap-2.5 font-head text-2xl font-extrabold">
        <span className="relative h-5 w-[26px] rounded bg-accent">
          <i className="absolute -left-1 top-1.5 size-2 rounded-full bg-bg" />
          <i className="absolute -right-1 top-1.5 size-2 rounded-full bg-bg" />
        </span>
        Evento
      </a>
      <button className="sm:hidden p-2" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span className="block h-0.5 w-6 bg-ink mb-1.5" /><span className="block h-0.5 w-6 bg-ink" />
      </button>
      <nav className={`${open ? 'flex' : 'hidden'} absolute left-0 right-0 top-full flex-col items-start gap-0 border-b border-line bg-bg px-4 pb-4 sm:static sm:flex sm:flex-row sm:items-center sm:gap-6 sm:border-0 sm:bg-transparent sm:p-0`} onClick={() => setOpen(false)}>
        <a className={link} href="#events">Events</a>
        <a className={link} href="#my">My tickets <b className="ml-1 inline-grid min-w-[22px] place-items-center rounded-full bg-ink px-1 text-xs text-bg">{count}</b></a>
        <a className={link} href="#about">About</a>
        <button onClick={toggleTheme} aria-label="Switch light or dark mode" className="mt-2 size-10 rounded-full border border-line bg-surface text-lg transition-transform hover:rotate-12 sm:mt-0">{dark ? '☀' : '☾'}</button>
      </nav>
    </header>
  )
}
