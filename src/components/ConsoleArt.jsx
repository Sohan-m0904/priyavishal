export default function ConsoleArt() {
  return (
    <div className="console-scene" aria-label="Abstract gaming console and controller illustration">
      <div className="orb orb-a" />
      <div className="orb orb-b" />
      <div className="console-platform" />
      <div className="console-body">
        <div className="console-wing left" />
        <div className="console-core"><span /></div>
        <div className="console-wing right" />
      </div>
      <div className="controller">
        <div className="controller-grip left" />
        <div className="controller-grip right" />
        <span className="stick left" /><span className="stick right" />
        <span className="dpad">+</span>
        <span className="face-buttons">✕ ○ △ □</span>
        <span className="touchpad" />
      </div>
      <div className="floating-chip chip-one">△</div>
      <div className="floating-chip chip-two">○</div>
      <div className="floating-chip chip-three">✕</div>
    </div>
  )
}
