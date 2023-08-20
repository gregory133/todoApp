export default class Note{

  public title:string
  public content:string

  constructor(title:string, content:string){
    this.title=title
    this.content=content
  }

  // serialize():string{
  //   return JSON.stringify({title:this.title, content:this.content})
  // }

  // deserialize(json:string){
  //   const data:Note=JSON.parse(json)
  //   return new Note(data.title, data.content)
  // }

}