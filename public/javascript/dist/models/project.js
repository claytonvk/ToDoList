export var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
    ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
    ProjectStatus[ProjectStatus["Deleted"] = 2] = "Deleted";
})(ProjectStatus || (ProjectStatus = {}));
export class Project {
    constructor(id, title, description, priority, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.status = status;
    }
}
//# sourceMappingURL=project.js.map