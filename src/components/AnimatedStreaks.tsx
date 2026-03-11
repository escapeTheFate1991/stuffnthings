export default function AnimatedStreaks({ opacity = 0.15 }: { opacity?: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ opacity }}>
      <div className="streak streak-1" style={{ top: '10%', left: '-50%' }} />
      <div className="streak streak-2" style={{ top: '30%', left: '-50%' }} />
      <div className="streak streak-3" style={{ top: '50%', left: '-50%' }} />
      <div className="streak streak-4" style={{ top: '70%', left: '-50%' }} />
      <div className="streak streak-5" style={{ top: '90%', left: '-50%' }} />
    </div>
  )
}
