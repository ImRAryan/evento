export const EVENTS = [
  { id: 1, title: 'Code Sprint 24-Hour Hackathon', cat: 'Tech', date: '2026-12-12T09:00', venue: 'KIIT Convention Centre, Bhubaneswar', price: 0, colors: ['#1c8a8a', '#101a33', '#f5a623'], desc: 'Build a working product in 24 hours with a team of up to four.', long: 'Form a team, pick a problem statement and ship a prototype by the next morning. Mentors from local startups will review your demo, and the top three teams win cash prizes. Meals and snacks are included.' },
  { id: 2, title: 'Odissi Evenings: Live Classical Night', cat: 'Music', date: '2026-12-19T18:30', venue: 'Rabindra Mandap, Bhubaneswar', price: 299, colors: ['#c0392b', '#f5a623', '#2b1c00'], desc: 'An evening of Odissi dance and live percussion.', long: 'Watch a troupe of award-winning dancers perform alongside live mardala and flute. Doors open at 6 pm. Seating is first come, first served within your ticket block.' },
  { id: 3, title: 'UI/UX Design Workshop', cat: 'Workshop', date: '2027-01-09T10:00', venue: 'Startup Odisha Hub, Bhubaneswar', price: 499, colors: ['#6c4ad0', '#e8ecf8', '#1c8a8a'], desc: 'A hands-on day of wireframes, prototypes and critique.', long: 'Learn the design process from research to a clickable prototype. Bring a laptop with Figma installed. You will leave with a finished case study for your portfolio.' },
  { id: 4, title: 'Startup Pitch Day', cat: 'Business', date: '2027-01-16T11:00', venue: 'IIM Sambalpur Auditorium', price: 199, colors: ['#f5a623', '#101a33', '#ffffff'], desc: 'Ten founders pitch to investors. You vote for the audience favourite.', long: 'Hear ten early-stage founders pitch for seed funding, then join a networking lunch with investors and mentors. Ideal for students and aspiring founders.' },
  { id: 5, title: 'Sunrise Marathon 10K', cat: 'Sports', date: '2027-01-26T05:30', venue: 'Marine Drive, Puri', price: 350, colors: ['#ff7a45', '#ffd166', '#1c8a8a'], desc: 'Run along the Puri coastline as the sun comes up.', long: 'A 10K and a 5K fun run along the beach road. Your fee covers a finisher medal, timing chip, breakfast and hydration stations along the way.' },
  { id: 6, title: 'Food & Street Culture Fest', cat: 'Culture', date: '2027-02-06T12:00', venue: 'Janata Maidan, Bhubaneswar', price: 0, colors: ['#2e9e5b', '#f5a623', '#101a33'], desc: 'Forty stalls, live folk music and a cooking contest.', long: 'Taste regional dishes from over forty stalls, watch live folk performances and join the open cooking contest. Entry is free; food is paid at the stalls.' },
  { id: 7, title: 'AI for Everyone Meetup', cat: 'Tech', date: '2027-02-14T16:00', venue: 'Online · Google Meet', price: 0, colors: ['#3a6df0', '#101a33', '#9bd1ff'], desc: 'Talks and demos on practical AI tools for students.', long: 'Three short talks on using AI tools for study, code and creative work, followed by live Q&A. The meeting link is emailed after registration.' },
  { id: 8, title: 'Watercolour Weekend Class', cat: 'Workshop', date: '2027-02-27T14:00', venue: 'Art Gallery Café, Cuttack', price: 650, colors: ['#d96cb0', '#ffd6ec', '#1c8a8a'], desc: 'Learn washes, gradients and landscapes. All materials provided.', long: 'No experience needed. An instructor guides you through basic techniques and you paint a landscape to take home. Materials and tea are included.' },
]
export const CATS = ['All', ...new Set(EVENTS.map((e) => e.cat))]

export const fmt = (iso, o) => new Date(iso).toLocaleDateString('en-IN', o)
export const priceText = (p) => (p === 0 ? 'Free' : '₹' + p)

// Generated artwork (no image files needed). Replace with real photo URLs if you like.
export function art(e) {
  const [a, b, c] = e.colors, s = e.id * 37
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 250' preserveAspectRatio='xMidYMid slice'><rect width='400' height='250' fill='${a}'/><circle cx='${80 + (s % 200)}' cy='${60 + (s % 90)}' r='${90 + (s % 40)}' fill='${b}' opacity='.85'/><circle cx='${300 - (s % 120)}' cy='${200 - (s % 60)}' r='${60 + (s % 30)}' fill='${c}' opacity='.9'/><path d='M0 ${190 + (s % 30)} Q120 ${130 + (s % 40)} 240 ${200 - (s % 30)} T400 ${170 + (s % 40)} V250 H0Z' fill='${b}' opacity='.5'/></svg>`
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
}

export function timeLeft(iso, now) {
  let d = Math.max(0, new Date(iso) - now)
  const out = {}
  for (const [k, v] of [['Days', 864e5], ['Hours', 36e5], ['Mins', 6e4], ['Secs', 1e3]]) { out[k] = Math.floor(d / v); d %= v }
  return out
}

export const rules = {
  name: (v) => (!v.trim() ? 'Enter your full name.' : !/^[A-Za-z][A-Za-z .'-]{1,59}$/.test(v.trim()) ? 'Use letters only, at least 2 characters.' : ''),
  email: (v) => (!v.trim() ? 'Enter your email address.' : !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? 'Enter a valid email, like name@example.com.' : ''),
  phone: (v) => { const d = v.replace(/[\s-]/g, '').replace(/^(\+91|0)/, ''); return !v.trim() ? 'Enter your phone number.' : !/^[6-9]\d{9}$/.test(d) ? 'Enter a valid 10-digit mobile number.' : '' },
  event: (v) => (v ? '' : 'Choose an event.'),
}
