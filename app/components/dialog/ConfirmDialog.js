import React from "react";
import OverlayTrigger from './OverlayTrigger';

export default class ConfirmDialog extends React.Component{
    renderOverlay(){
        const {
            header,
            children,
            confirmCallback,
            ...props
        } = this.props;

        return(
            <div className="modal" style={{ width: 300 }} {...props}>
                <div className="modal-content">
                    <h4>{header ? header : "Are you sure?"}</h4>
                    {children}
                </div>
                <div className="modal-footer">
                    <button className="btn waves-effect waves-light btn-flat modal-action modal-close">
                        <span>No</span>
                    </button>
                    <button className="btn waves-effect waves-light btn-flat modal-action modal-close"
                            onClick={confirmCallback.bind(this)}>
                        <span>Yes</span>
                    </button>
                </div>
            </div>
        )
    }
    render(){
        return (
            <OverlayTrigger overlay={this.renderOverlay()}>
                {this.props.trigger}
            </OverlayTrigger>
        )
    }
}