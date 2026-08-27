import { Gamepad2, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Navbar({ onSupport }) {
  const [open, setOpen] = useState(false)
  const links = [
    ['The Case', '#case'],
    ['Supporters', '#supporters'],
    ['Stats', '#stats'],
    ['Timeline', '#timeline'],
  ]

  const go = (id) => {
    setOpen(false)
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="nav-shell">
      <nav className="navbar container">
        <button className="brand" onClick={() => go('#top')} aria-label="Back to top">
          <span className="brand-mark"><Gamepad2 size={21} /></span>
          <span><strong>VISHAL</strong><small>PETITION FUND</small></span>
        </button>

        <div className={`nav-links ${open ? 'open' : ''}`}>
          {links.map(([label, id]) => (
            <button key={id} onClick={() => go(id)}>{label}</button>
          ))}
          <button className="nav-cta mobile-only" onClick={() => { setOpen(false); onSupport() }}>Support Vishal</button>
        </div>

        <button className="nav-cta desktop-only" onClick={onSupport}>Support Vishal</button>
        <button className="menu-button" onClick={() => setOpen(v => !v)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </nav>
    </header>
  )
}
