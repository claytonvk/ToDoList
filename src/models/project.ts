//Project Type
export enum ProjectStatus {
    Active,
    Finished,
    Deleted
  }
  
  
  //Project Class
export class Project {
  constructor(
     public id: string, 
     public title: string, 
     public description: string, 
     public priority: number, 
     public status: ProjectStatus 
     ){}
  }