import { CheckCircle2, Copy, Share2, X } from 'lucide-react'

export default function SuccessModal({ open, onClose, onShare, onCopy }) {
  if (!open) return null
  return (
    <div className="modal-backdrop">
      <div className="success-modal" role="dialog" aria-modal="true">
        <button className="modal-close" onClick={onClose} aria-label="Close"><X size={18} /></button>
        <div className="success-icon"><CheckCircle2 size={38} /></div>
        <div className="eyebrow">SIGNATURE CONFIRMED</div>
        <h3>You have chosen correctly.</h3>
        <p>Your signature has officially been added to the campaign for Vishal’s PS5.</p>
        <div className="success-actions">
          <button className="primary-action" onClick={onShare}><Share2 size={18}/> Share the Petition</button>
          <button className="secondary-action" onClick={onCopy}><Copy size={18}/> Copy Link</button>
        </div>
      </div>
    </div>
  )
}
