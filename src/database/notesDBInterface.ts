import { SQLite, SQLiteObject } from '@ionic-native/sqlite/';
import Note from '../classes/Note';
import { executeSql } from './dbUtility';



export async function createNotesTableIfNotExist(db:SQLiteObject){
  executeSql(`
    create table if not exists Notes (
    dateCreated integer primary key not null,
    title text,
    content text);`, db) 
}

export async function addNoteToDB(note:Note, db:SQLiteObject) {
  executeSql(`insert into Notes values (${note.dateCreated}, '${note.title}', 
  '${note.content}');`, db)
}

export async function deleteNoteFromDB(dateCreated:number, db:SQLiteObject) {
  executeSql(`delete from Notes where dateCreated = ${dateCreated};`, db)
}

export async function updateNoteInDB(dateCreated:number, newNoteContents:Note, db:SQLiteObject){
  executeSql(`update Notes set title = '${newNoteContents.title}', 
  content = '${newNoteContents.content}' where dateCreated = ${dateCreated}`, db)
}

export async function getAllNotes(db:SQLiteObject){
  const queryResult:any = await executeSql(`select * from Notes;`, db)
  let notes:Note[]=[]

  if (queryResult){
    for (let i=0; i<queryResult.rows.length; i++){
      notes.push(queryResult.rows.item(i))
    }
  }

  return notes
  

}

export async function getNumberOfNotes(db:SQLiteObject) {
  const queryResult:any=await executeSql(`select count(*) as note_count from Notes`, db)
  return queryResult.rows.item(0).note_count
}

export async function getNoteByDateCreated(db:SQLiteObject, dateCreated: number) {
  const queryResult:any=await executeSql(`select * from Notes where dateCreated = 
  ${dateCreated}`, db)
}
