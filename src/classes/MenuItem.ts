export default class MenuItem{

  public title:string
  public onClick:()=>void
  public icon:string

  constructor(title:string, onClick:()=>void, icon:string){
    this.title=title
    this.onClick=onClick
    this.icon=icon
  }
  

}