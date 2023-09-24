import { Component } from './base-component.js';
import { DragTarget } from '../models/drag-drop.js';
import { Project, ProjectStatus } from '../models/project.js';
import { autobind } from '../decorators/autobind.js';
import { projectState } from '../state/project-state.js';
import { ProjectItem } from './project-item.js'


//ProjectList Class
export class ProjectList extends Component<HTMLDivElement, HTMLElement> 
implements DragTarget{
  assignedProjects: Project[];

  constructor (private type: 'active' | 'finished' | 'deleted'){
      super('project-list', 'container', false, `${type}-projects`)
      //
      this.assignedProjects = [];
      this.configure()
      this.renderContent()
      // this.cancelHandler();
  }

  @autobind
  dragOverHandler(evt: DragEvent) {
    if (evt.dataTransfer && evt.dataTransfer.types[0] === 'text/plain') {
      evt.preventDefault();
      const listEl = this.element.querySelector('ul')!;
      listEl.classList.add('droppable');
    }
  }
  @autobind
  dropHandler(evt: DragEvent) {
    const prjID = evt.dataTransfer!.getData('text/plain');
    let prdStatus
    if (this.type === 'active' ){
      prdStatus = ProjectStatus.Active
    } else if (this.type === 'deleted'){
      prdStatus = ProjectStatus.Deleted
    } else {
      prdStatus = ProjectStatus.Finished
    }
    projectState.moveProject(prjID, prdStatus)
  }


  @autobind
  dropLeaveHandler(_: DragEvent) {
    const listEl = this.element.querySelector('ul')!;
    listEl.classList.remove('droppable');
  }

  configure() {
    this.element.addEventListener('dragover', this.dragOverHandler);
    this.element.addEventListener('dragleave', this.dropLeaveHandler);
    this.element.addEventListener('drop', this.dropHandler);
      projectState.addListener((projects: Project[]) => {
          const relevantProjects = projects.filter(prj => {
              if (this.type === 'active') {
                return prj.status === ProjectStatus.Active;
              } else if (this.type === 'finished'){
                return prj.status === ProjectStatus.Finished;
              } else {
              return prj.status === ProjectStatus.Deleted;
            }
              
            });
            
          this.assignedProjects = relevantProjects;
          console.log(this.assignedProjects)
          // THIS IS WHERE I WOULD UPDATE STATUS IN MONGO
          this.renderProjects();
      });
  }

  renderContent() {
      const listID = `${this.type}-projects-list`
      this.element.querySelector('ul')!.id = listID;
      this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
  }

  private renderProjects() {
      const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
      listEl.innerHTML = '';
      for (const prjItem of this.assignedProjects) {
        new ProjectItem(this.element.querySelector('ul')!.id, prjItem);
        const project = document.getElementById(prjItem.id)!;
        const cancel = project.querySelector("#cancel")!;
        cancel.addEventListener("click", () => {
          project.style.display = "none"
          prjItem.status = ProjectStatus.Deleted;}, 
        {once : true});
      }
        
    }
}