import React from 'react';

import TaskDialog from "../Tasks/TaskDialog";
import ButtonsStore from "./../stores/ButtonsStore";

export default class ButtonsList extends React.Component{
    render(){
        let section = this.props.routeParams.section;
        let buttons = ButtonsStore.getList();
        return (
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
        )
    }
}