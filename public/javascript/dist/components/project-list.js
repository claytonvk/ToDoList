var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from './base-component.js';
import { ProjectStatus } from '../models/project.js';
import { autobind } from '../decorators/autobind.js';
import { projectState } from '../state/project-state.js';
import { ProjectItem } from './project-item.js';
export class ProjectList extends Component {
    constructor(type) {
        super('project-list', 'container', false, `${type}-projects`);
        this.type = type;
        const userDataArray = localStorage.getItem('userData');
        if (userDataArray) {
            const userData = JSON.parse(userDataArray);
            userData.filter((prj) => prj.status == ProjectStatus.Active);
            this.assignedProjects = userData;
        }
        else {
            this.assignedProjects = [];
        }
        this.configure();
        this.renderContent();
    }
    dragOverHandler(evt) {
        if (evt.dataTransfer && evt.dataTransfer.types[0] === 'text/plain') {
            evt.preventDefault();
            const listEl = this.element.querySelector('ul');
            listEl.classList.add('droppable');
        }
    }
    dropHandler(evt) {
        const prjID = evt.dataTransfer.getData('text/plain');
        let prdStatus;
        if (this.type === 'active') {
            prdStatus = ProjectStatus.Active;
        }
        else if (this.type === 'deleted') {
            prdStatus = ProjectStatus.Deleted;
        }
        else {
            prdStatus = ProjectStatus.Finished;
        }
        projectState.moveProject(prjID, prdStatus);
    }
    dropLeaveHandler(_) {
        const listEl = this.element.querySelector('ul');
        listEl.classList.remove('droppable');
    }
    configure() {
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('dragleave', this.dropLeaveHandler);
        this.element.addEventListener('drop', this.dropHandler);
        projectState.addListener((projects) => {
            const relevantProjects = projects.filter(prj => {
                if (this.type === 'active') {
                    return prj.status === ProjectStatus.Active;
                }
                else if (this.type === 'finished') {
                    return prj.status === ProjectStatus.Finished;
                }
                else {
                    return prj.status === ProjectStatus.Deleted;
                }
            });
            localStorage.removeItem('userData');
            const data = projects;
            localStorage.setItem('userData', JSON.stringify(data));
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        });
        projectState.updateListeners();
    }
    renderContent() {
        const listID = `${this.type}-projects-list`;
        this.element.querySelector('ul').id = listID;
        this.element.querySelector('h2').textContent = this.type.toUpperCase() + ' PROJECTS';
    }
    renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`);
        if (listEl) {
            listEl.innerHTML = '';
            for (const prjItem of this.assignedProjects) {
                new ProjectItem(this.element.querySelector('ul').id, prjItem);
                const project = document.getElementById(prjItem.id);
                const cancel = project.querySelector("#cancel");
                cancel.addEventListener("click", () => {
                    project.style.display = "none";
                    prjItem.status = ProjectStatus.Deleted;
                    const userData = JSON.parse(localStorage.getItem('userData'));
                    for (const i in userData) {
                        if (userData[i].id === project.id) {
                            userData.splice(i, 1);
                            localStorage.setItem('userData', JSON.stringify(userData));
                        }
                    }
                }, { once: true });
            }
        }
    }
}
__decorate([
    autobind
], ProjectList.prototype, "dragOverHandler", null);
__decorate([
    autobind
], ProjectList.prototype, "dropHandler", null);
__decorate([
    autobind
], ProjectList.prototype, "dropLeaveHandler", null);
//# sourceMappingURL=project-list.js.map