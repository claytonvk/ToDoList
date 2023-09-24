import { Project, ProjectStatus } from "../models/project.js";

//Project State Management
type Listener<T> = (items: T[]) => void;

class State<T>{
  protected listeners: Listener<T>[] = [];

  addListener(listenerFn: Listener<T>) {
      this.listeners.push(listenerFn);
  }
}

export class ProjectState extends State<Project>{
  private projects: Project[];
  private static instance: ProjectState;

  private constructor () {
      super()
      const userDataArray = localStorage.getItem('userData');
      if(userDataArray){
        const userData = JSON.parse(userDataArray);
        const updatedData: Project[] = []
        for(const i of userData) {
          if(i.status < 1){
            updatedData.push(i)
          }
        }
        this.projects = updatedData
      } else {
        this.projects = []
      }
  }

  static getInstance() {
      if(this.instance) {
          return this.instance
      }
      this.instance = new ProjectState();
      return this.instance;
      }

  addProject(title: string, description: string, priority: number) {
      const newProj = new Project(
          Math.random().toString(),
          title,
          description,
          priority,
          ProjectStatus.Active);
      newProj.status = 0
      this.projects.push(newProj);
      newProj.status = 0
      this.updateListeners();
      
  }

  moveProject(projectID: string, newStatus: ProjectStatus) {
    const project = this.projects.find(prj => prj.id === projectID);
    if (project && project.status !== newStatus) {
      project.status = newStatus;
      this.updateListeners();
    }
  }
  //private
   updateListeners() {
    for(const listenerFn of this.listeners) {
      listenerFn(this.projects.slice())
  }
  }
}

export const projectState = ProjectState.getInstance();