var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from './base-component.js';
import { validate } from '../util/validation.js';
import { autobind } from '../decorators/autobind.js';
import { projectState } from '../state/project-state.js';
export class ProjectInput extends Component {
    constructor() {
        super('project-input', 'app', true, 'user-input');
        this.titleInputElement = this.element.querySelector('#title');
        this.descriptionInputElement = this.element.querySelector('#description');
        this.priorityInputElement = this.element.querySelector('#priority');
        this.configure();
    }
    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }
    renderContent() { }
    ;
    gatherUserInput() {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPriority = this.priorityInputElement.value;
        const titleValidatable = {
            value: enteredTitle,
            required: true,
            minLength: 1
        };
        const descriptionValidatable = {
            value: enteredDescription,
            required: true,
            minLength: 1
        };
        const priorityValidatable = {
            value: +enteredPriority,
            required: true
        };
        if (!validate(titleValidatable) ||
            !validate(descriptionValidatable) ||
            !validate(priorityValidatable)) {
            alert('Invalid project, please try again');
            return;
        }
        else {
            return [enteredTitle, enteredDescription, +enteredPriority];
        }
    }
    clearInputs() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.priorityInputElement.value = '';
    }
    submitHandler(evt) {
        evt.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, desc, priority] = userInput;
            projectState.addProject(title, desc, priority);
            this.clearInputs();
        }
    }
}
__decorate([
    autobind
], ProjectInput.prototype, "submitHandler", null);
//# sourceMappingURL=project-input.js.map