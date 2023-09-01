import { create } from 'zustand'
import Note from '../classes/Note'
import * as Collections from 'typescript-collections';

interface NotesState{
  savedNotes:Collections.Dictionary<number, Note>,
  currentNote:Note|null,
  setCurrentNote:(newCurrentNote:Note|null
    )=>void,
  addNote:(newNote:Note)=>void,
  editNote: (dateCreated:number, newNote:Note)=>void,
  deleteNote: (dateCreated:number)=>void
}

export const useNotesStore=create<NotesState>()(set=>(
  {
    savedNotes:new Collections.Dictionary(),
    currentNote:null,
    setCurrentNote:(newCurrentNote:Note|null)=>set(state=>({
      currentNote:newCurrentNote
    })),
    addNote:(newNote:Note)=>set(state=>{
      const newDict=new Collections.Dictionary<number, Note>()
      state.savedNotes.forEach((key:number, value:Note)=>{
        newDict.setValue(key, value)
      })
      newDict.setValue(newNote.dateCreated, newNote)
      // console.log(newNote.dateCreated);
      return {savedNotes: newDict}
    }),
    editNote:(dateCreated:number, newNote:Note)=>set(state=>{
      const newDict=new Collections.Dictionary<number, Note>()
      state.savedNotes.forEach((key:number, value:Note)=>{
        newDict.setValue(key, value)
      })

      newDict.remove(dateCreated)
      newDict.setValue(dateCreated, newNote)

      return {savedNotes: newDict}

    }),
    deleteNote:(dateCreated:number)=>set(state=>{
      const newDict=new Collections.Dictionary<number, Note>()
      state.savedNotes.forEach((key:number, value:Note)=>{
        newDict.setValue(key, value)
      })

      newDict.remove(dateCreated)

      return {savedNotes: newDict}
    })


  }
))