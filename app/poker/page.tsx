import CreateGameButton from '@/app/poker/create-game-button';
import { getServerSession } from 'next-auth'

export default async function Page() {
  const session = await getServerSession();

  if (session?.user?.email) {
    return (
      <main
className="flex flex-col min-h-screen">
        <h1>Poker</h1>
        <p>{session!.user!.name}</p>
        <CreateGameButton />
      </main>
    )
  } else {
    return (
      <div>Loading...</div>
    )
  }
}
