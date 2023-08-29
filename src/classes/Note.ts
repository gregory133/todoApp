export default class Note{

  public title:string
  public content:string
  public dateCreated:number

  constructor(title:string, content:string){
    this.title=title
    this.content=content
    this.dateCreated=Date.now()
  }

}