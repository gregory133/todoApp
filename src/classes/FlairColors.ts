import { Dictionary } from "typescript-collections";
import { Flair } from "./Reminder";

const flairColorDict=new Dictionary<Flair, string>()

flairColorDict.setValue('Appointment', '#1800ff')
flairColorDict.setValue('Chore', '#f87c07')
flairColorDict.setValue('Exam', '#ff0003')
flairColorDict.setValue('Homework', '#00eaff')
flairColorDict.setValue('Miscellaneous', '#e916a3')
flairColorDict.setValue('None', '#000000')
flairColorDict.setValue('Work', '#0fff00')

export default flairColorDict;