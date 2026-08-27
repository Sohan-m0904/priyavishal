import { X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const stages = [
  { title: 'Are you sure? 🤨', text: 'Please reconsider. Vishal really wants this PS5.', yes: 'I’ve changed my mind — YES', no: 'No, I’m sure' },
  { title: 'Priya, please think carefully.', text: 'A decision of this magnitude should not be rushed.', yes: 'Fine. Buy the PS5', no: 'I STILL SAY NO' },
  { title: 'Are you absolutely sure?', text: 'Scientists recommend buying Vishal a PS5.*', yes: 'Trust the science — YES', no: 'Unfortunately, still no' },
  { title: 'This is getting serious.', text: 'Petition supporters are currently judging this decision.', yes: 'Okay, okay — YES', no: 'I refuse to cooperate' },
  { title: 'Final warning 🚨', text: 'Rejecting this petition may result in Vishal continuing to play on inferior hardware.', yes: 'Prevent this tragedy', no: 'No PS5 for Vishal' },
  { title: 'Emergency Meeting Required', text: 'The Petition Committee has been informed of your decision.', yes: 'Reverse my decision', no: 'I accept the consequences' },
  { title: 'We can do this all day.', text: 'There is still time to press YES.', yes: 'YES. END THIS.', no: 'Still no 😈' },
]

export default function VoteModal({ open, stage, supporterCount, onClose, onYes, onNo }) {
  const [dodging, setDodging] = useState({ x: 0, y: 0 })
  const noRef = useRef(null)
  const item = stages[Math.min(stage, stages.length - 1)]
  const advanced = stage >= 5

  useEffect(() => setDodging({ x: 0, y: 0 }), [stage, open])
  if (!open) return null

  const dodge = () => {
    if (!advanced) return
    const x = Math.round((Math.random() - 0.5) * 120)
    const y = Math.round((Math.random() - 0.5) * 70)
    setDodging({ x, y })
  }

  return (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="vote-modal" role="dialog" aria-modal="true">
        <button className="modal-close" onClick={onClose} aria-label="Close"><X size={18} /></button>
        <div className="modal-kicker">NO ATTEMPT #{stage + 1}</div>
        <h3>{item.title}</h3>
        <p>{stage === 3 ? `${supporterCount} petition supporters are currently judging this decision.` : item.text}</p>
        {stage >= 4 && <div className="warning-strip">⚠️ This decision will be entered into the extremely unofficial record.</div>}
        <div className="modal-actions">
          <button className="yes-button modal-yes" style={{ transform: `scale(${Math.min(1 + stage * 0.055, 1.35)})` }} onClick={onYes}>{item.yes}</button>
          <button
            ref={noRef}
            className="no-button modal-no"
            onMouseEnter={dodge}
            onMouseMove={dodge}
            onClick={onNo}
            style={{ transform: `translate(${dodging.x}px, ${dodging.y}px) scale(${Math.max(1 - stage * .06, .58)})` }}
          >
            {item.no}
          </button>
        </div>
        {advanced && <small className="modal-footnote">The NO button appears to be experiencing second thoughts.</small>}
      </div>
    </div>
  )
}
