'use client'

export default function AdminControls(props: {
  className?: string,
  roomId: string,
}) {
  const {
    className = '',
    roomId,
  } = props

  async function handleNextRoundClick() {
    const response = await fetch(
      `/api/rooms/${roomId}/rounds`,
      {
        method: 'POST',
      }
    )

    console.log(await response.json());
  }

  function handleFlipCardsClick() {

  }

  return (
    <div className={`${className} flex flex-col gap-4`}>
      <button
        onClick={handleFlipCardsClick}
        className="btn btn-secondary"
      >Flip Cards
      </button>
      <button
        onClick={handleNextRoundClick}
        className="btn btn-secondary"
      >Next Round
      </button>
    </div>
  )
}