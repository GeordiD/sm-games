import { Status } from '@/app/_lib/utils/Status';
import { GetRoomApiResponse } from '@/app/api/rooms/[slug]/route';
import { Player } from '@prisma/client';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';


interface RoomState {
  status: Status,
  error: string | null,
  players: Player[],
  hasLoaded: boolean,
  currentPlayer: {
    id: string,
    isAdmin: boolean,
  },
  roomId: string,
}

const initialState: RoomState = {
  status: 'idle',
  error: null,
  players: [],
  hasLoaded: false,
  currentPlayer: {
    id: '',
    isAdmin: false,
  },
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
    updatePlayerId(state, action: PayloadAction<string>) {
      return {
        ...state,
        currentPlayer: {
          ...state.currentPlayer,
          id: action.payload,
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRoomData.fulfilled, (state, action: PayloadAction<GetRoomApiResponse>) => {
      const isAdmin = action.payload.players.find(x => x.cuid === state.currentPlayer.id)
        ?.isAdmin ?? false;

      return {
        ...state,
        status: 'succeeded',
        players: action.payload.players,
        hasLoaded: true,
        currentPlayer: {
          ...state.currentPlayer,
          isAdmin,
        },
        roomId: action.payload.room.id
      };
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
