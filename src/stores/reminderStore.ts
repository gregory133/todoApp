import { Dictionary } from "typescript-collections";
import { create } from "zustand";
import Reminder from "../classes/Reminder";

interface ReminderState {
  reminders: Dictionary<number, Reminder>,
  currentReminder: null|Reminder,
  setCurrentReminder: (reminder:Reminder|null)=>void
  addReminder: (newReminder: Reminder) => void,
  deleteReminder: (dateCreated: number) => void,
  editReminder: (dateCreated:number, newReminder:Reminder)=>void
}

export const useReminderStore = create<ReminderState>()(set => (
  {
    reminders: new Dictionary(),
    currentReminder: null,
    setCurrentReminder: (newCurrentReminder:Reminder|null)=>set(state=>{
      return {currentReminder: newCurrentReminder}
    }),
    addReminder: (newReminder: Reminder) => set(state => {
      const newDict = new Dictionary<number, Reminder>()
      state.reminders.forEach((key: number, value: Reminder) => {
        newDict.setValue(key, value)
      })
      newDict.setValue(newReminder.dateCreated, newReminder)
      return { reminders: newDict }
    }),
    deleteReminder: (dateCreated: number) => set(state => {
      const newDict = new Dictionary<number, Reminder>()
      state.reminders.forEach((key: number, value: Reminder) => {
        newDict.setValue(key, value)
      })

      newDict.remove(dateCreated)

      return { reminders: newDict }
    }),
    editReminder:(dateCreated:number, newReminder:Reminder)=>set(state=>{
      const newDict=new Dictionary<number, Reminder>()
      state.reminders.forEach((key:number, value:Reminder)=>{
        newDict.setValue(key, value)
      })

      newDict.remove(dateCreated)
      newDict.setValue(dateCreated, newReminder)

      return {reminders: newDict}

    })

  }
))