import React from "react";
import { Link } from "react-router";

import SectionDialog from "./SectionDialog";
import SectionStore from "./../stores/SectionsStore";

import ConfirmDialog from "./../dialog/ConfirmDialog";

export default class Section extends React.Component{
    deleteSection(){
        SectionStore.del(this.props.id);
        window.location = "#/sections";
    }
    render(){
        return (
            <div className="card small hoverable left">
                <div className="card-image waves-effect waves-block waves-light">
                    <img className="activator" src="images/health.jpg" />
                </div>
                <div className="card-content">
                    <span className="card-title activator grey-text text-darken-4">
                        {this.props.name}
                        <i className="material-icons right">more_vert</i></span>
                    <p><Link to={"/sections/" + this.props.id + "/list"}>Show section tasks</Link></p>
                </div>
                <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4">
                        {this.props.name}
                        <i className="material-icons right">close</i></span>
                    <p>{this.props.description}</p>
                </div>
                <div className="card-action">
                    <SectionDialog
                        section={this.props}
                        trigger={
                            <button className="btn waves-effect waves-light modal-action modal-close">
                                <span>Edit</span>
                            </button>
                        } />
                    <ConfirmDialog
                        header="Are you sure?"
                        confirmCallback={this.deleteSection.bind(this)}
                        trigger={
                            <button className="btn waves-effect waves-light modal-action modal-close">
                                <span>Delete</span>
                            </button>
                        }>
                        <p>Delete section {this.props.name}?</p>
                    </ConfirmDialog>
                </div>
            </div>
        );
    }
}