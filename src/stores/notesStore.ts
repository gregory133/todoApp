import { create } from 'zustand'
import Note from '../classes/Note'

interface NotesState{
  savedNotes:Note[],
  currentNote:Note|null,
  setCurrentNote:(newCurrentNote:Note|null)=>void,
  addNote:(newNote:Note)=>void
}

export const useNotesStore=create<NotesState>()(set=>(
  {
    savedNotes:[],
    currentNote:null,
    setCurrentNote:(newCurrentNote:Note|null)=>set(state=>({
      currentNote:newCurrentNote
    })),
    addNote:(newNote:Note)=>set(state=>({
      savedNotes:[...state.savedNotes, newNote]
    }))

  }
))