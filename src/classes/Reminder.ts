export type Flair = 'None'|'Homework'|'Exam'|'Chore'|'Appointment'|'Work'|'Miscellaneous'

export default class Reminder{

  public memo:string
  public dateTime: string
  public flair: Flair
  public dateCreated:number

  constructor(memo:string, dateTime: string, flair: Flair){
    this.memo=memo
    this.dateTime=dateTime
    this.flair=flair
    this.dateCreated=Date.now()
  }

}