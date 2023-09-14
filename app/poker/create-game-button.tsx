'use client'

export default function CreateGameButton() {
  function handleCreate() {
    fetch(
      '/api/games',
      {
        method: 'POST'
      }
    )
  }

  return (
    <button onClick={handleCreate}>Create Game</button>
  )
}