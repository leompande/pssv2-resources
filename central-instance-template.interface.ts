export interface CentralInstanceInterface{
  uid:string,
  name:string,
  description:string,
  version:string,
  yearPublished:string,
  sections:{
    uid:string,
    code:string,
    name:string,
    sectionNumber:number,
    description:string,
    subSections:{
      uid:stirng,
      code:string,
      name:string,
      subSectionNumber:number,
      description,
       indicators:{
          uid:string,
          code:string,
          name:string,
          description:string,
          translations:{
            uid:string,
            lang:string,
            name:string,
            description:string
          }[],
          dataElements:{
            uid:stirng,
            code:string,
            name:string,
            description:string,
            dataType:string
          }[],
          indicatorType:string,// PERCENTAGE, NUMBER, RATIO, RATE etc
          formula:string,
          denominator:string, // DATA ELEMENT UUID
          numerator:string // DATA ELEMENT UUID
          indicatorType:string,// PERCENTAGE, NUMBER, RATIO, RATE etc
          formula:string,
          denominator:string,
          numerator:string
        }[],
    }[]
  }[],
  isPublished:boolean,
  createdAt:date
  publishedAt:date,
}
