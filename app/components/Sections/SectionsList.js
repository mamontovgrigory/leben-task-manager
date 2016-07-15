import React from "react";
import { Link } from "react-router";

import Section from "./Section";
import SectionDialog from "./SectionDialog";
import SectionStore from "../../stores/SectionsStore";

import ButtonsStore from "../../stores/ButtonsStore";

export default class SectionsList extends React.Component{
    render(){
        let buttons = ButtonsStore.getList();
        let sections = SectionStore.getList();
        return(
            <div>
                <div className="container row">
                    {
                        buttons.map((el) => {
                            switch(el.action){
                                case "create":
                                    return (
                                        <SectionDialog
                                            key={el.id}
                                            trigger={
                                            <button className="btn waves-effect waves-light modal-action modal-close">
                                                <span>{el.name}</span>
                                            </button>
                                        } />
                                    );
                                    break;
                                default:
                                    return (
                                        <Link className="waves-effect waves-light btn" key={el.id}
                                            to={"/sections/" + el.action}>{el.name}</Link>
                                    )
                            }
                        })
                    }
                </div>
                <div className="container row">
                    {
                        sections.map((el) => {
                            return <Section key={el.id} {...el} />
                        })
                    }
                </div>
            </div>
        )
    }
}