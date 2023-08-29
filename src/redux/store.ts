import { notesSlice } from './slices/notesSlice';
import { configureStore } from "@reduxjs/toolkit";
import notesReducer from './slices/notesSlice'


export const store=configureStore({
  reducer:{
    notes:notesReducer
  }
})

export type StoreState=ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch