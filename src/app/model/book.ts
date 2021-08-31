export class Book {

  constructor(
      public id: number,
      public title: string,
      public author: number,
      public genre: number,
      public text: string,
      public cycle?: number,
      public description?: string
    ) {  }
}
