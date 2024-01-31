'use client'

export default function AdminControls(props: {
  className?: string,
}) {
  const {
    className = '',
  } = props

  function handleNextRoundClick() {

  }

  function handleFlipCardsClick() {

  }

  return (
    <div className={`${className}`}>
      <button
        onClick={handleNextRoundClick}
        className="btn btn-secondary"
      >Next Round
      </button>
      <button
        onClick={handleFlipCardsClick}
        className="btn btn-secondary"
      >Flip Cards
      </button>
    </div>
  )
}