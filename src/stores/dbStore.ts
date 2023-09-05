import { SQLiteObject } from '@ionic-native/sqlite'
import { create } from 'zustand'

interface DbState{
  db:SQLiteObject|undefined,
  setDb: (db:SQLiteObject)=>void
}

export const useDbStore=create<DbState>()(set=>(
  {
    db: undefined,
    setDb: (newDb:SQLiteObject)=>set(state=>{
      return {db:newDb} 
    })
  }
))

