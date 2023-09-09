export type Flair = 'none'|'homework'|'exam'|'chore'|'appointment'|'work'|'miscellaneous'

export default class Reminder{

  public memo:string
  public dateTime: string
  public flair: Flair

  constructor(memo:string, dateTime: string, flair: Flair){
    this.memo=memo
    this.dateTime=dateTime
    this.flair=flair
  }

}