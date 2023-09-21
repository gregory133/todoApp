import { SQLiteObject } from "@ionic-native/sqlite";

export async function executeSql(sql:string, db:SQLiteObject){
  let queryResult
  try{
    queryResult = await db.executeSql(sql, [])
  }
  catch(err){
    console.log('no db support');
  }
  
  return queryResult
}

export async function clearTable(db:SQLiteObject, tableName:string){
  executeSql(`delete from ${tableName};`, db)
}

export async function deleteTable(db:SQLiteObject, tableName:string){
  executeSql(`drop table ${tableName};`, db)
}