import { fetchRoomData } from '@/app/_lib/store/roomSlice';
import { Status } from '@/app/_lib/utils/status';
import { CreateRoundApiResponse } from '@/app/api/rooms/[slug]/rounds/route';
import { GetRoomApiResponse } from '@/app/api/rooms/[slug]/route';
import { Round } from '@prisma/client';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface RoundState {
  active?: Round,
  history: Round[],
  votes: Record<string, string>,

  status: Status,
  error: string | null,
}

const initialState: RoundState = {
  active: undefined,
  history: [],
  votes: {},
  
  status: 'idle',
  error: null,
}

export const createNewRound = createAsyncThunk('round/create', async (roomId: string) => {
  const response = await fetch(
    `/api/rooms/${roomId}/rounds`,
    {
      method: 'POST',
    }
  )

  return response.json();
})

const roundSlice = createSlice({
  name: 'round',
  initialState,
  reducers: {
    updateVote(state, action: PayloadAction<{
      playerId: string,
      value: string,
    }>) {
      state.votes[action.payload.playerId] = action.payload.value;

      return state;
    }
  },
  extraReducers: (builder) => {
    // Listen to RoomSlice event for initial data
    builder.addCase(fetchRoomData.fulfilled, (state, action: PayloadAction<GetRoomApiResponse>) => {
      return {
        ...state,
        active: action.payload.activeRound,
        history: action.payload.history,
        votes: action.payload.votes,
      }
    })

    // Create New Round
    builder.addCase(createNewRound.fulfilled, (state, action: PayloadAction<CreateRoundApiResponse>) => {
      const history = [...state.history];
      if (state.active)
        history.unshift(state.active);

      return {
        ...state,
        status: 'idle',
        active: action.payload.activeRound,
        history,
      }
    });

    builder.addCase(createNewRound.pending, (state) => ({
      ...state,
      status: 'pending'
    }));

    builder.addCase(createNewRound.rejected, (state) => ({
      ...state,
      status: 'failed',
      error: 'Error creating a new round',
    }));
  }
});

export default roundSlice.reducer;