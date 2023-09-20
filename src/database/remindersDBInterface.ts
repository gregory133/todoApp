import { SQLite, SQLiteObject } from '@ionic-native/sqlite/'; 
import Reminder from '../classes/Reminder';
import { executeSql } from './dbUtility';

export async function createReminderTableIfNotExist(db:SQLiteObject) {
  executeSql(`
    create table if not exists Reminder (
    dateCreated integer primary key not null,
    memo text,
    flair text,
    dateTime text);`, db) 
}

export async function addReminderToDB(reminder:Reminder, db:SQLiteObject) {
  executeSql(`insert into Reminder values (
    ${reminder.dateCreated}, '${reminder.memo}', '${reminder.flair}', 
    '${reminder.dateTime}'
  )`, db)
}

export async function updateReminderInDB(dateCreated:number, db:SQLiteObject,
  newReminder: Reminder) {
    executeSql(`update Reminder set memo = '${newReminder.memo}', 
    flair = '${newReminder.flair}', dateTime = '${newReminder.dateTime}' where 
    dateCreated = ${dateCreated}`, db)
}

export async function deleteReminderFromDB(dateCreated:number, db:SQLiteObject) {
  executeSql(`delete from Reminder where dateCreated = ${dateCreated};`, db)
}

export async function getAllReminders(db:SQLiteObject) {
  const queryResult:any = await executeSql(`select * from Reminder;`, db)
  let reminders:Reminder[]=[]

  if (queryResult){
    for (let i=0; i<queryResult.rows.length; i++){
      reminders.push(queryResult.rows.item(i))
    }
  }

  return reminders
}

export async function getReminderByDateCreated(db:SQLiteObject, dateCreated: number) {
  const queryResult:any=await executeSql(`select * from Reminder where dateCreated = 
  ${dateCreated}`, db)
}