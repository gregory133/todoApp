import Reminder, { Flair } from "./Reminder"

export default class HighlightedDate{

  public date:string
  public reminder:Reminder

  constructor(date:string, reminder:Reminder){
    this.date=date
    this.reminder=reminder
  } 

}