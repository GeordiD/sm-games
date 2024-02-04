import roomSlice from '@/app/_lib/store/roomSlice'
import roundSlice from '@/app/_lib/store/roundSlice'
import { configureStore } from '@reduxjs/toolkit'

export const makeStore = () => {
  return configureStore({
    reducer: {
      room: roomSlice,
      round: roundSlice,
    }
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']