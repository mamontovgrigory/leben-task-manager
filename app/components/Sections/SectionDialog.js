import React from "react";
import OverlayTrigger from '.././dialog/OverlayTrigger';

import SectionsStore from "../../stores/SectionsStore";

export default class SectionDialog extends React.Component{
    constructor(props){
        super(props);

        this.state = this.props.section ? this.props.section : {};
    }
    onChangeHandlerName(e){
        this.setState({ name: e.target.value });
    }
    onChangeHandlerDescription(e){
        this.setState({ description: e.target.value });
    }
    submitHandler(e){
        SectionsStore.save(this.state);
        if(!this.props.task){
            this.state = {};
            this.setState({});
        }
        window.location = "#/sections";
        e.preventDefault();
    }
    renderOverlay(){
        const {
            ...props
        } = this.props;
        
        return(
            <div className="modal" style={{ width: 600 }} {...props}>
                <div className="modal-content panel">
                    <form className="col s12">
                        <h5 className="center-align ">{this.state.name ? "Edit Section " + this.state.name : "New Section"}</h5>
                        <div className="row">
                            <div className="input-field col s6">
                                <input id="name" type="text" className="validate"
                                       value={this.state.name}
                                       onChange={this.onChangeHandlerName.bind(this)} />
                                <label htmlFor="name" className="">Section Name</label>
                            </div>
                            <div className="file-field input-field col s6">
                                <div className="btn">
                                    <span>Picture</span>
                                    <input type="file" />
                                </div>
                                <div className="file-path-wrapper">
                                    <input className="file-path" type="text" />
                                </div>
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