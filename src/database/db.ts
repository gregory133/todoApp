import { SQLite, SQLiteObject } from '@ionic-native/sqlite/';
import Note from '../classes/Note';

async function executeSql(sql:string, db:SQLiteObject){
  const queryResult = await db.executeSql(sql, [])
  return queryResult
}

export function test() {
  console.log('testing');
  SQLite.create({
    name: 'TodoDB',
    location: 'default'
  }).then(async (db:SQLiteObject)=>{
    
    await db.executeSql(`create table if not exists Notes(
      dateCreated integer,
      title text,
      content text
    );`, [])
    
    await db.executeSql(`delete from Notes`, [])
    await db.executeSql(`insert into Notes values (1, 'hello', 'world');`, [])
    const result = await db.executeSql(`select * from Notes;`, [])
    for (let i=0; i<result.rows.length; i++){
      console.log(JSON.stringify(result.rows.item(i)))
    }
    
  })
}

export async function clearTable(db:SQLiteObject, tableName:string){
  executeSql(`delete from ${tableName};`, db)
}

export async function createNotesTableIfNotExist(db:SQLiteObject){
  executeSql(`
  create table if not exists Notes (
    dateCreated integer,
    title text,
    content text
  );`, db)
}

export async function addNoteToDB(note:Note, db:SQLiteObject,) {
  executeSql(`insert into Notes values (${note.dateCreated}, '${note.title}', 
  '${note.content}');`, db)
}

export async function getAllNotes(db:SQLiteObject){
  const queryResult = executeSql(`select * from Notes;`, db)
  return queryResult

}

export async function getNoteByDateCreated(db:SQLiteObject, dateCreated: number) {
  
}
