import { create } from "zustand";
import MenuItem from "../classes/MenuItem";

interface MenuState{
  currentMenuItem:undefined|MenuItem
  setCurrentMenuItem: (newMenuItem:undefined|MenuItem)=>void
}

export const useMenuStore=create<MenuState>()(set=>({
  currentMenuItem: undefined,
  setCurrentMenuItem: (newMenuItem:undefined|MenuItem)=>set(state=>{
    return {currentMenuItem:newMenuItem}
  })
})
 
)