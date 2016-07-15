import React from "react";
import { Link } from "react-router";

import BreadcrumbsStore from "../stores/BreadcrumbsStore";

export default class Breadcrumbs extends React.Component{
    render(){
        let links = this.props && this.props.breadcrumb ?
            BreadcrumbsStore.getList(this.props.breadcrumb, this.props.params) :
            [];
        return (
            <nav className="panel row">
                <div className="nav-wrapper container">
                    <div className="col s12">
                        {
                            links.map((el) => {
                                return <Link key={el.id} to={el.href} className="breadcrumb">{el.name}</Link>
                            })
                        }
                    </div>
                </div>
            </nav>
        )
    }
}