'use client'

import Card from '@/app/_components/card';
import { useAppSelector } from '@/app/_lib/hooks';
import AdminControls from '@/app/poker/rooms/[slug]/admin-controls';
import ResultsPanel from '@/app/poker/rooms/[slug]/results-panel';
import VotingOptions from '@/app/poker/rooms/[slug]/voting-options';

export default function MainPanel(props: {
  roomId: string,
  currentPlayerId: string,
}) {

  const isAdmin = useAppSelector(state => state.room.currentPlayerIsAdmin);
  const isCardsFlipped = useAppSelector(state => state.round.active?.isCardsFlipped);

  const header = [
    isCardsFlipped ? (<p key="header">Results</p>) : (<p key="header">Vote</p>)
  ]

  if (isAdmin) header.push((
    <AdminControls
      key="adminControls"
      roomId={props.roomId}
    />
  ));

  const votingPanel = (
    <VotingOptions
      currentPlayerId={props.currentPlayerId}
      roomId={props.roomId}
    />
  )

  const resultsPanel = (
    <ResultsPanel />
  )

  return (
    <Card
      header={header}
      className="h-full"
    >
      {
        isCardsFlipped ? resultsPanel : votingPanel
      }
    </Card>

  )
}