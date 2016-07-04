import React from "react";

import OverlayTrigger from '.././dialog/OverlayTrigger';
import TasksStore from "./../stores/TasksStore";

export default class TaskDialog extends React.Component{
    constructor(props){
        super(props);

        this.state = this.props.task ? this.props.task : {
            section: this.props.section
        };
    }
    onChangeHandlerName(e){
        this.setState({
            name: e.target.value
        });
    }
    onChangeHandlerDescription(e){
        this.setState({
            description: e.target.value
        });
    }
    onChangeHandlerType(e){
        this.setState({
            type: e.target.value
        });
    }
    submitHandler(e){
        TasksStore.save(this.state);
        if(!this.props.task){
            this.state = {};
            this.setState({ section: this.props.section });
        }
        window.location = "#/sections/" + this.props.section + "/list";
        e.preventDefault();
    }
    renderOverlay(){
        const {
            ...props
        } = this.props;

        let types = TasksStore.getTypes();
        return(
            <div className="modal" style={{ width: 600 }} {...props}>
                <div className="modal-content panel">
                    <form className="col s12">
                        <h5 className="center-align ">{this.state.id ? "Edit task \"" + this.state.name + "\"" : "New task"}</h5>
                        <div className="row">
                            <div className="input-field col s6">
                                <input id="name" type="text" className="validate required"
                                       value={this.state.name}
                                       onChange={this.onChangeHandlerName.bind(this)} />
                                <label htmlFor="name" className="">task Name</label>
                            </div>
                            <div className="input-field col s6">
                                <select name="type" value={this.state.type} id="select">
                                    {
                                        types.map((el) => {
                                            return <option key={el.id} value={el.id}>{el.name}</option>
                                        })
                                    }
                                </select>
                                <label htmlFor="type">Type</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                            <textarea id="description" className="materialize-textarea"
                                      value={this.state.description}
                                      onChange={this.onChangeHandlerDescription.bind(this)} />
                                <label htmlFor="description" className="">Description</label>
                            </div>
                        </div>
                        {
                            this.state.comments ? this.state.comments.map((el) => {
                                return <div className="row">{el}</div>
                            }) : null
                        }
                    </form>
                </div>
                <div className="modal-footer">
                    <button className="btn waves-effect waves-light btn-flat modal-action modal-close">
                        <span>Cancel</span>
                    </button>
                    <button className="btn waves-effect waves-light success btn-flat modal-action modal-close"
                            onClick={this.submitHandler.bind(this)}>
                        <span>Save</span>
                    </button>
                </div>
            </div>
        )
    }
    render(){
        return (
            <OverlayTrigger
                overlay={ this.renderOverlay() }
                callback={ function(){
                    Materialize.updateTextFields();
                    $('select').material_select();
                    $('#select').on('change',this.onChangeHandlerType);
                }}
            >
                {this.props.trigger}
            </OverlayTrigger>
        )
    }
}