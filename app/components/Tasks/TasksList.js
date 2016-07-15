import { Link } from "react-router";

import Task from "./../Tasks/Task";
import TaskDialog from "./TaskDialog";
import TasksStore from "../../stores/TasksStore";
import ButtonsStore from "../../stores/ButtonsStore";

export default class TasksList extends React.Component{
    componentDidMount(){
        $('.collapsible').collapsible({
            accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
        });
    }
    render(){
        let section = this.props.routeParams.section;
        let buttons = ButtonsStore.getList();
        let tasks = TasksStore.getList(section);
        return(
            <div>
                <div className="container row">
                    {
                        buttons.map((el) => {
                            switch(el.action){
                                case "create":
                                    return (
                                        <TaskDialog
                                            key={el.id}
                                            section={section}
                                            trigger={
                                            <button className="btn waves-effect waves-light modal-action modal-close">
                                                <span>{el.name}</span>
                                            </button>
                                        } />
                                    );
                                    break;
                                default:
                                    return (
                                        <Link
                                            className="waves-effect waves-light btn" key={el.id}
                                            to={"/sections/" + section + "/list/" + el.action}>{el.name}</Link>
                                    )
                            }
                        })
                    }
                </div>
                <div className="container row">
                    <ul className="collapsible popout" data-collapsible="accordion">
                        {
                            tasks.map((el) => {
                                return <Task key={el.id} section={section} {...el} />
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}