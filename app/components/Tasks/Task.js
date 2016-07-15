import TaskDialog from "./TaskDialog";
import TaskCompleteDialog from "./TaskCompleteDialog";
import TasksStore from "./../stores/TasksStore";
import ConfirmDialog from "./../dialog/ConfirmDialog";

export default class Task extends React.Component{
    deleteTask(){
        TasksStore.del(this.props.id);
        window.location = "#/sections/" + this.props.section + "/list";
    }
    setCompletion(){
        var task = {
            id: this.props.id,
            name: this.props.name,
            description: this.props.description,
            note: this.props.note,
            section: this.props.section,
            isCompleted: !this.props.isCompleted
        };
        TasksStore.save(task);
        window.location = "#/sections/" + this.props.section + "/list";
    }
    render(){
        let completedClass = this.props.isCompleted ? "success" : "";
        return (
            <li>
                <div className={"collapsible-header " + completedClass}>
                    <i className="material-icons">today</i>{this.props.name}
                </div>
                <div className="collapsible-body">
                    <div className="section">
                        {
                            this.props.isCompleted ?
                                <button className={"btn waves-effect waves-light"} onClick={this.setCompletion.bind(this)}>
                                    <span>Reopen</span>
                                </button>
                                :
                                <TaskCompleteDialog
                                    task={this.props}
                                    section={this.props.section}
                                    trigger={
                                    <button className="btn waves-effect waves-light">
                                        <span>Complete</span>
                                    </button>
                                } />
                        }
                        <TaskDialog
                            task={this.props}
                            section={this.props.section}
                            trigger={
                                <button className="btn waves-effect waves-light">
                                    <span>Edit</span>
                                </button>
                            } />
                        <ConfirmDialog
                            header="Are you sure?"
                            confirmCallback={this.deleteTask.bind(this)}
                            trigger={
                                <button className="btn waves-effect waves-light">
                                    <span>Delete</span>
                                </button>
                            }
                        >
                            <p>Delete task {this.props.name}?</p>
                        </ConfirmDialog>
                        <div className="divider"></div>
                        <div className="section">
                            {this.props.description}
                        </div>
                    </div>
                </div>
            </li>
        );
    }
}