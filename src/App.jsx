import { useEffect, useMemo, useState } from 'react'
import confetti from 'canvas-confetti'
import {
  Activity, BarChart3, BatteryCharging, Check, Clock3, Copy, Gamepad2,
  HeartPulse, Landmark, LockKeyhole, MessageSquareQuote, Rocket, Share2,
  ShieldCheck, Sparkles, TimerReset, TrendingUp, Users, Zap
} from 'lucide-react'
import Navbar from './components/Navbar'
import ConsoleArt from './components/ConsoleArt'
import VoteModal from './components/VoteModal'
import SuccessModal from './components/SuccessModal'

const INITIAL = 127
const STORAGE = {
  yes: 'vishal_petition_yes_count',
  voted: 'vishal_petition_voted',
  no: 'vishal_petition_no_attempts',
  comments: 'vishal_petition_comments',
}

const seedComments = [
  { name: 'Ronil', message: 'It’s time. Buy the man his PS5.' },
  { name: 'Anonymous', message: 'I don’t even know Vishal but this cause feels important.' },
  { name: 'Concerned Gamer', message: 'Every day without a PS5 is another day lost.' },
  { name: 'The Petition Committee', message: 'We strongly recommend immediate action.' },
]

const reasons = [
  [Zap, 'Faster Loading', 'Vishal has already spent enough of his life staring at loading screens.'],
  [Gamepad2, 'Better Games', 'Future gaming memories are currently being delayed.'],
  [HeartPulse, 'Mental Wellbeing', 'Few things bring peace like hearing the PlayStation startup sound.'],
  [Landmark, 'Economic Stimulus', 'Buying a PS5 would directly support the gaming industry.'],
  [ShieldCheck, 'Friendship Preservation', 'Friends don’t let friends game on outdated hardware.'],
  [Sparkles, 'Because Vishal Wants One', 'Possibly the strongest argument presented so far.'],
]

function safeRead(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw == null ? fallback : JSON.parse(raw)
  } catch { return fallback }
}

export default function App() {
  const [yesCount, setYesCount] = useState(() => Math.max(INITIAL, safeRead(STORAGE.yes, INITIAL)))
  const [hasVoted, setHasVoted] = useState(() => safeRead(STORAGE.voted, false))
  const [noAttempts, setNoAttempts] = useState(() => safeRead(STORAGE.no, 0))
  const [comments, setComments] = useState(() => safeRead(STORAGE.comments, seedComments))
  const [noModal, setNoModal] = useState(false)
  const [noStage, setNoStage] = useState(0)
  const [success, setSuccess] = useState(false)
  const [toast, setToast] = useState('')
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => localStorage.setItem(STORAGE.yes, JSON.stringify(yesCount)), [yesCount])
  useEffect(() => localStorage.setItem(STORAGE.voted, JSON.stringify(hasVoted)), [hasVoted])
  useEffect(() => localStorage.setItem(STORAGE.no, JSON.stringify(noAttempts)), [noAttempts])
  useEffect(() => localStorage.setItem(STORAGE.comments, JSON.stringify(comments)), [comments])

  useEffect(() => {
    const timer = setInterval(() => {
      const notes = ['🔥 Someone just signed the petition', '🎮 The movement is growing', '⚡ Momentum is building', '👀 Priya has been notified*']
      setToast(notes[Math.floor(Math.random() * notes.length)])
      setTimeout(() => setToast(''), 3600)
    }, 17000)
    return () => clearInterval(timer)
  }, [])

  const blastConfetti = (big = false) => {
    const end = Date.now() + (big ? 1800 : 850)
    const frame = () => {
      confetti({ particleCount: big ? 8 : 5, angle: 60, spread: 65, origin: { x: 0 }, scalar: .9 })
      confetti({ particleCount: big ? 8 : 5, angle: 120, spread: 65, origin: { x: 1 }, scalar: .9 })
      if (Date.now() < end) requestAnimationFrame(frame)
    }
    frame()
  }

  const voteYes = () => {
    setNoModal(false)
    if (hasVoted) {
      setToast('✅ Your signature is already on the petition')
      return
    }
    setHasVoted(true)
    setYesCount(v => v + 1)
    setSuccess(true)
    blastConfetti()
  }

  const attemptNo = () => {
    setNoAttempts(v => v + 1)
    setNoStage(0)
    setNoModal(true)
  }

  const continueNo = () => {
    setNoAttempts(v => v + 1)
    setNoStage(v => Math.min(v + 1, 6))
  }

  const share = async () => {
    const data = { title: 'Petition for Priya to Buy Vishal a PS5', text: 'The people demand justice. Sign the petition.', url: window.location.href }
    try {
      if (navigator.share) await navigator.share(data)
      else await copyLink()
    } catch {}
  }

  const copyLink = async () => {
    try { await navigator.clipboard.writeText(window.location.href); setToast('🔗 Petition link copied') }
    catch { setToast('Copy the address bar link to share the petition') }
  }

  const submitComment = (e) => {
    e.preventDefault()
    if (!message.trim()) return
    const next = { name: name.trim() || 'Anonymous Supporter', message: message.trim() }
    setComments(prev => [next, ...prev])
    setName(''); setMessage(''); setToast('💬 Your message joined the campaign')
  }

  const daysWithout = useMemo(() => {
    const start = new Date('2023-11-10')
    return Math.max(1, Math.floor((Date.now() - start.getTime()) / 86400000))
  }, [])

  return (
    <div className="app" id="top">
      <div className="ambient-grid" />
      <div className="bg-controller c1">△</div><div className="bg-controller c2">○</div><div className="bg-controller c3">✕</div>
      <Navbar onSupport={() => document.querySelector('#vote')?.scrollIntoView({ behavior: 'smooth' })} />

      <main>
        <section className="hero container">
          <div className="hero-copy">
            <div className="eyebrow"><span /> PETITION</div>
            <h1>Priya Must Buy Vishal a <em>PS5</em></h1>
            <p className="hero-lead">Vishal has waited long enough. The games are getting better. The loading screens are getting faster. Yet one major problem remains — Vishal still does not have a PS5.</p>
            <p className="hero-punch">Together, we can change that.</p>
            <div className="hero-actions">
              <button className="primary-action" onClick={() => document.querySelector('#vote')?.scrollIntoView({ behavior: 'smooth' })}>Sign the Petition <Rocket size={18}/></button>
              <button className="secondary-action" onClick={share}><Share2 size={18}/> Share</button>
            </div>
            <div className="trust-row"><span><Check size={15}/> No payment required</span><span><ShieldCheck size={15}/> 100% unofficial</span></div>
          </div>
          <ConsoleArt />
        </section>

        <section className="goal-banner container">
          <div><span>🔥 100+ SIGNATURES — EXCEEDED</span><h2>The petition has already passed 100 signatures. The pressure on Priya is officially mounting.</h2></div>
          <button className="massive-cta" onClick={() => document.querySelector('#vote')?.scrollIntoView({ behavior: 'smooth' })}>JOIN THE MOVEMENT 🎮</button>
        </section>

        <section className="petition-card container">
          <div className="petition-head">
            <div><span className="section-label">LIVE PETITION</span><h2>Over 100 signatures — and counting</h2></div>
            <div className="live-pill"><span className="live-dot" /> LIVE</div>
          </div>
          <div className="count-row"><strong key={yesCount}>{yesCount}</strong><span>YES signatures</span><b>100+ EXCEEDED</b></div>
          <div className="progress-track exceeded"><div className="progress-fill" style={{ width: '100%' }}><span /></div></div>
          <div className="petition-meta"><p><Users size={18}/><strong>{yesCount} people</strong> have already demanded justice.</p><p><Activity size={18}/> Recent activity: <strong>support is accelerating</strong></p></div>
        </section>

        <section className="vote-section container" id="vote">
          <div className="section-label">YOUR VOTE MATTERS*</div>
          <h2>Should Priya Buy Vishal a PS5?</h2>
          <p>There are technically two options. One of them is substantially more encouraged.</p>
          <div className="vote-buttons">
            <button className="yes-button" onClick={voteYes}>{hasVoted ? '✓ YOU VOTED YES' : 'YES — BUY VISHAL A PS5 🎮'}</button>
            <button className="no-button" onClick={attemptNo}>NO</button>
          </div>
          <small>*Your vote matters emotionally. This is not an actual democratic institution.</small>
        </section>

        <section className="content-section container" id="case">
          <div className="section-heading"><span className="section-label">EVIDENCE FILE</span><h2>The Case for Vishal’s PS5</h2><p>Six arguments. Zero weaknesses. Several questionable citations.</p></div>
          <div className="reason-grid">
            {reasons.map(([Icon, title, text], i) => <article className="reason-card" key={title}><div className="reason-icon"><Icon /></div><span>0{i+1}</span><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </section>

        <section className="supporters-section" id="supporters">
          <div className="container supporters-layout">
            <div>
              <span className="section-label">PUBLIC RECORD</span><h2>Messages From Supporters</h2><p className="section-copy">The coalition is broad, vocal, and surprisingly invested in Vishal’s hardware situation.</p>
              <form className="comment-form" onSubmit={submitComment}>
                <label>Name<input value={name} onChange={e => setName(e.target.value)} maxLength={40} placeholder="Your name (optional)" /></label>
                <label>Message<textarea value={message} onChange={e => setMessage(e.target.value)} maxLength={180} placeholder="Make your case for the PS5..." required /></label>
                <button className="primary-action" type="submit"><MessageSquareQuote size={18}/> Add Message</button>
              </form>
            </div>
            <div className="comments-list">
              {comments.slice(0, 8).map((comment, i) => <article className="comment-card" key={`${comment.name}-${i}`}><MessageSquareQuote size={22}/><p>“{comment.message}”</p><strong>{comment.name}</strong><small>Verified supporter*</small></article>)}
            </div>
          </div>
        </section>

        <section className="content-section container" id="stats">
          <div className="section-heading"><span className="section-label">CAMPAIGN INTELLIGENCE</span><h2>Petition Statistics</h2><p>A serious dashboard for an unserious constitutional matter.</p></div>
          <div className="stats-grid">
            <Stat icon={Users} value={yesCount} label="Total signatures" note="Citizens of good taste" />
            <Stat icon={TrendingUp} value="100+" label="Milestone exceeded" note="The petition has already broken three figures" />
            <Stat icon={Activity} value="RISING" label="Campaign momentum" note="Signatures are still coming in" />
            <Stat icon={TimerReset} value={noAttempts} label="NO attempts" note="Every attempt has been documented" />
            <Stat icon={Clock3} value={daysWithout.toLocaleString()} label="Days without a PS5" note="Approximate humanitarian estimate" />
            <Stat icon={BarChart3} value={Math.max(1, Math.round(yesCount / 7))} label="Momentum index" note="Scientifically meaningless" />
          </div>
        </section>

        <section className="timeline-section container" id="timeline">
          <div className="section-heading"><span className="section-label">ROAD TO VICTORY</span><h2>Campaign Timeline</h2></div>
          <div className="timeline">
            <Timeline n="01" title="Awareness" text="Priya becomes aware that Vishal requires a PS5." done />
            <Timeline n="02" title="Public Pressure" text="The petition begins collecting signatures." done />
            <Timeline n="03" title="Negotiations" text="Representatives from both parties discuss the purchase." active />
            <Timeline n="04" title="Victory" text="Priya purchases the PS5." locked />
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-inner"><div><Gamepad2 /><strong>VISHAL PETITION FUND</strong></div><p>“This petition is completely serious.*<br/><small>*Legally, it is absolutely not serious.”</small></p><span>Made in support of Vishal’s gaming future.</span></div>
      </footer>

      {toast && <div className="toast">{toast}</div>}
      <VoteModal open={noModal} stage={noStage} supporterCount={yesCount} onClose={() => setNoModal(false)} onYes={voteYes} onNo={continueNo} />
      <SuccessModal open={success} onClose={() => setSuccess(false)} onShare={share} onCopy={copyLink} />
    </div>
  )
}

function Stat({ icon: Icon, value, label, note }) {
  return <article className="stat-card"><div className="stat-icon"><Icon /></div><strong>{value}</strong><h3>{label}</h3><p>{note}</p></article>
}

function Timeline({ n, title, text, active, locked, done }) {
  return <article className={`timeline-item ${active ? 'active' : ''} ${locked ? 'locked' : ''} ${done ? 'done' : ''}`}><div className="timeline-node">{locked ? <LockKeyhole size={18}/> : done ? <Check size={18}/> : n}</div><div><span>STAGE {n}</span><h3>{title}</h3><p>{text}</p>{locked && <small>Pending PS5 purchase</small>}</div></article>
}
