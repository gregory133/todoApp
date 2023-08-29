import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Note from '../../classes/Note'

export interface notesState{
  currentNote:{title:string, content:string}|null,
  notes:{title:string, content:string}[]
}

const initialState:notesState={
  currentNote:null,
  notes:[]
}

//thunks
export const setCurrentNoteAsync=createAsyncThunk(
  'notes/setCurrentNoteAsync',
  async (note:Note, thunkAPI)=>{
    return note
  }
)

export const notesSlice=createSlice({
  name: 'notes',
  initialState,
  reducers:{
    addNote:(state, action:PayloadAction<string>)=>{
      const noteToAdd=JSON.parse(action.payload)
      state.notes.push(noteToAdd)
    },
    setCurrentNote:(state, action:PayloadAction<string>)=>{
      const newCurrentNote=JSON.parse(action.payload) as {title:string,
        content:string}|null

      state.currentNote=newCurrentNote
    }
  },
  extraReducers:builder=>{
    builder.addCase(setCurrentNoteAsync.fulfilled, (state, action)=>{
      state.currentNote=action.payload
      // console.log('updated in extra', state.currentNote);
    })
  }
})

export const {addNote, setCurrentNote}=notesSlice.actions
export default notesSlice.reducer