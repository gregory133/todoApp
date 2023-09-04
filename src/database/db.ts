import { SQLite, SQLiteObject } from '@ionic-native/sqlite/';
import Note from '../classes/Note';

async function executeSql(sql:string){
  const db=await getDB()
  const queryResult = await db.executeSql(sql, [])
  return queryResult
}

export function test() {
  console.log('testing');
  SQLite.create({
    name: 'NotesDB',
    location: 'default'
  }).then((db:SQLiteObject)=>{
    console.log('then');
    db.executeSql(`
    create table Notes if not exists (
      dateCreated integer,
      title text,
      content text
    );`, [])
    .then(creation=>{
      console.log('created', creation);
    })
    // console.log('created', create);
    // const insert= await db.executeSql(`insert into Notes values (1, 'hello', 'world');`, [])
    // console.log('inserted', insert); 
    // const result = await db.executeSql(`select * from Notes;`, [])
    // console.log('result', JSON.stringify(result));
  })
}

function getDB():Promise<SQLiteObject>{
  return new Promise((res, rej)=>{
    SQLite.create({
      name: 'testDB',
      location: 'default'
    }).then((db:SQLiteObject)=>{
      res(db)
    })
  })
 
}

export async function clearTable(tableName:string){
  executeSql(`delete from ${tableName};`)
}

export async function createNotesTableIfNotExist(){
  executeSql(`
  create table Notes (
    dateCreated integer,
    title text,
    content text
  );`)
}

export async function addNoteToDB(note:Note) {
  executeSql(`insert into Notes values (${note.dateCreated}, '${note.title}', 
  '${note.content}');`)
}

export async function getAllNotes(){
  const queryResult = executeSql(`select * from Notes;`)
  return queryResult

}

export async function getNoteByDateCreated(dateCreated: number) {
  
}
