'use client'

import Card from '@/app/_components/card';
import { useAppSelector } from '@/app/_lib/hooks';
import AdminControls from '@/app/poker/rooms/[slug]/admin-controls';
import VotingOptions from '@/app/poker/rooms/[slug]/voting-options';

export default function MainPanel(props: {
  roomId: string,
  currentPlayerId: string,
}) {

  const isAdmin = useAppSelector(state => state.room.currentPlayerIsAdmin);

  const header = [
    (<p key="header">Vote</p>)
  ]

  if (isAdmin) header.push((
    <AdminControls
      key="adminControls"
      roomId={props.roomId}
    />
  ));

  return (
    <Card
      header={header}
      className="h-full"
    >
      <VotingOptions
        currentPlayerId={props.currentPlayerId}
        roomId={props.roomId}
      />
    </Card>

  )
}