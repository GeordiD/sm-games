'use client'

export default function VotingPanel(props: {
  roomId: string,
  currentPlayerId: string,
}) {

  const votingOptions = [1, 2, 3, 5, 8];

  async function handleVote(value: number) {
    await fetch(
      `/api/rooms/${props.roomId}/vote`,
      {
        method: 'POST',
        body: JSON.stringify({
          playerId: props.currentPlayerId,
          value: value.toString(),
        })
      }
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {
        votingOptions.map(option =>
          <button
            className="btn btn-square btn-secondary"
            key={option}
            onClick={() => handleVote(option)}
          >
            {option}
          </button>
        )
      }
    </div>
  )
}