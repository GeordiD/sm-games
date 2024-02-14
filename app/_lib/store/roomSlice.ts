import { Status } from '@/app/_lib/utils/Status';
import { GetRoomApiResponse } from '@/app/api/rooms/[slug]/route';
import { Player } from '@prisma/client';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';


interface RoomState {
  status: Status,
  error: string | null,
  players: Player[],
  hasLoaded: boolean,
}

const initialState: RoomState = {
  status: 'idle',
  error: null,
  players: [],
  hasLoaded: false,
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
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRoomData.fulfilled, (state, action: PayloadAction<GetRoomApiResponse>) => {
      return {
        ...state,
        status: 'succeeded',
        players: action.payload.players,
        hasLoaded: true,
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
