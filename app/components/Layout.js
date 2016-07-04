import React from "react";

import TopPanel from "./TopPanel";
import Breadcrumbs from "./Breadcrumbs";
import BottomPanel from "./BottomPanel";

export default class Layout extends React.Component{
    render() {
        return (
            <div>
                <TopPanel />
                <Breadcrumbs breadcrumb={this.props.routes[1].breadcrumb} params={this.props.params} />
                {this.props.children}
                <BottomPanel />
            </div>
        );
    }
}