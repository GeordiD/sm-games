Room {
  id,
  userId,
  nickname?,

  // Default settings:
  cards: [1, 2, 3, 5, 8, 13, ?],
}

Players: {
  id: (generated cuid),
  name,
  isVoter: true,
  isAdmin,
}

Round: {
  id,
  roomId,
  isActive,
  name?,
}

Vote: {
  id,
  roundId,
  playerId,
  value,
  time,
}


Leader: userId
Participants: {
  some-id, (local-storage)
  name,
  isVoter,
}[]
Settings: {
  cards: [1, 2, 3, 5, 8],
}
Round: {
  name?,
  votes: {
    participantId,
    value,
  }[],
}
History: Rouind[]