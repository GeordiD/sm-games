import { Status } from '@/app/_lib/utils/Status';
import { GetRoomApiResponse } from '@/app/api/rooms/[slug]/route';
import { Player } from '@prisma/client';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';


interface RoomState {
  status: Status,
  error: string | null,
  players: Player[],
  hasLoaded: boolean,
  currentPlayerId: string,
  currentPlayerIsAdmin: boolean,
  roomId: string,
}

const initialState: RoomState = {
  status: 'idle',
  error: null,
  players: [],
  hasLoaded: false,
  currentPlayerId: '',
  currentPlayerIsAdmin: false,
  roomId: '',
};

export const fetchRoomData = createAsyncThunk('room/fetchRoom', async (id: string) => {
  const response = await fetch(
    `/api/rooms/${id}`,
    {
      method: 'GET'
    }
  );

  
  if (response.status === 404) {
    return null;
  } else {
    const result = await response.json();
    return result;
  }
})

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    reset(state) {
      return {
        ...state,
        status: 'idle',
        error: null,
        hasLoaded: false,
        players: [],
        currentPlayerId: '',
        currentPlayerIsAdmin: false,
        roomId: '',
      }
    },
    updatePlayerId(state, action: PayloadAction<string>) {
      return {
        ...state,
        currentPlayerId: action.payload,
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRoomData.fulfilled, (state, action: PayloadAction<GetRoomApiResponse>) => {
      const isAdmin = action.payload.players.find(x => x.cuid === state.currentPlayerId)
        ?.isAdmin ?? false;

      // Only update the state if there is a player id.
      // This was added to prevent bugs when leaving/rejoining rooms. We reset the state
      // but then a room_change is triggered and the room state is refetched causing
      // unexpected state when logging back into the room
      // This fixed it by denying that room state refetch because there'd be no id
      if (state.currentPlayerId) {
        return {
          ...state,
          status: 'succeeded',
          players: action.payload.players,
          hasLoaded: true,
          currentPlayerIsAdmin: isAdmin,
          roomId: action.payload.room.id
        };
      }
    });

    builder.addCase(fetchRoomData.pending, (state) => {
      return {
        ...state,
        status: 'pending',
      }
    });

    builder.addCase(fetchRoomData.rejected, (state) => {
      return {
        ...state,
        status: 'failed',
        error: 'some error',
      }
    })
  }
});

export default roomSlice.reducer;
