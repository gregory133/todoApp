import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface notesState{
  notes:{title:string, content:string}[]
}

const initialState:notesState={
  notes:[]
}


export const notesSlice=createSlice({
  name: 'notes',
  initialState,
  reducers:{
    addNote:(state, action:PayloadAction<string>)=>{
      const noteToAdd=JSON.parse(action.payload)
      state.notes.push(noteToAdd)
    }
  }
})

export const {addNote}=notesSlice.actions
export default notesSlice.reducer