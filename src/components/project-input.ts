import { Component } from './base-component.js'
import { Validatable, validate } from '../util/validation.js'
import { autobind } from '../decorators/autobind.js'
import { projectState } from '../state/project-state.js'
   
   //projectInput Class
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    priorityInputElement: HTMLInputElement;
  
    constructor(){
        super('project-input', 'app', true, 'user-input')
        this.titleInputElement = this.element.querySelector('#title')! as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector('#description')! as HTMLInputElement;
        this.priorityInputElement = this.element.querySelector('#priority')! as HTMLInputElement;
        this.configure();
    }
  
    configure() {
        this.element.addEventListener('submit', this.submitHandler)
    }
  
    renderContent() {};
  
    private gatherUserInput (): [string, string, number] | void {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPriority = this.priorityInputElement.value;
        const titleValidatable: Validatable = {
            value: enteredTitle, 
            required: true,
            minLength: 1
        };
        const descriptionValidatable: Validatable = {
            value: enteredDescription, 
            required: true,
            minLength: 1
        };
        const priorityValidatable: Validatable = {
            value: +enteredPriority, 
            required: true
        };
        if (
            !validate(titleValidatable) ||
            !validate(descriptionValidatable) ||
            !validate(priorityValidatable)
        ) {
            alert('Invalid project, please try again');
            return
        } else {
            return [enteredTitle, enteredDescription, +enteredPriority]
        }
    }
  
    private clearInputs () {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.priorityInputElement.value = '';
    }
  
    @autobind
    private submitHandler (evt: Event) {
        evt.preventDefault();
        const userInput = this.gatherUserInput();
        if(Array.isArray(userInput)) {
            const [title, desc, priority] = userInput;
            projectState.addProject(title, desc, priority);
            this.clearInputs()
        }
    }
  
  }