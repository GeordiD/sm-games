import { fetchRoomData } from '@/app/_lib/store/roomSlice';
import { GetRoomApiResponse } from '@/app/api/rooms/[slug]/route';
import { Round } from '@prisma/client';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface RoundState {
  active?: Round,
  history: Round[],
}

const initialState: RoundState = {
  active: undefined,
  history: [],
}

const roundSlice = createSlice({
  name: 'round',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRoomData.fulfilled, (state, action: PayloadAction<GetRoomApiResponse>) => {
      return {
        ...state,
        active: action.payload.activeRound,
        history: action.payload.history,
      }
    })
  }
});

export default roundSlice.reducer;