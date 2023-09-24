import { Draggable } from '../models/drag-drop.js';
import { Project } from '../models/project.js';
import { Component } from './base-component.js';
import { autobind } from '../decorators/autobind.js';


    //ProjectItem Class
export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> 
implements Draggable{
  private project: Project;

  constructor(hostId: string, project: Project) {
      super('single-project', hostId, false, project.id)
      this.project = project;

      this.configure();
      this.renderContent();
  }

  @autobind
  dragStartHandler(evt: DragEvent) {
    evt.dataTransfer!.setData('text/plain', this.project.id);
    evt.dataTransfer!.effectAllowed = 'move';
  }

  dragEndHandler(_: DragEvent) {
  }

  configure() {
    this.element.addEventListener('dragstart', this.dragStartHandler)
    this.element.addEventListener('dragend', this.dragEndHandler)
  }

  renderContent() {
      this.element.querySelector('h2')!.textContent = this.project.title;
      this.element.querySelector('h3')!.textContent = ` - priority: ${this.project.priority}/5`;
      this.element.querySelector('p')!.textContent = this.project.description;
  }

}