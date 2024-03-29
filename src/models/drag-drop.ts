//Drag and Drop Interfaces
export interface Draggable {
    dragStartHandler(evt: DragEvent): void;
    dragEndHandler(evt: DragEvent): void;
}
  
export interface DragTarget{
    dragOverHandler(evt: DragEvent): void;
    dropHandler(evt: DragEvent): void;
    dropLeaveHandler(evt: DragEvent): void;
}

