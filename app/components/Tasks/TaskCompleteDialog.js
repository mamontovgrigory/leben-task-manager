import _ from "lodash";

import OverlayTrigger from '.././dialog/OverlayTrigger';
import TasksStore from ".././stores/TasksStore";

export default class TaskCompleteDialog extends React.Component{
    constructor(props){
        super(props);

        this.state = this.props.task ? this.props.task : { section: this.props.section };
    }
    onChangeHandlerTimeSpent(e){
        this.setState({ timeSpent: e.target.value });
    }
    onChangeHandlerComment(e){
        this.setState({ comment: e.target.value });
    }
    submitHandler(e){
        TasksStore.save(_.assignIn(this.state, {
            isCompleted: true
        }));
        window.location = "#/sections/" + this.props.section + "/list";
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
                        <h5 className="center-align ">{"Completion task \"" + this.state.name + "\""}</h5>
                        <div className="row">
                            <div className="input-field col s6">
                                <input id="timeSpent" type="text" className="validate"
                                       onChange={this.onChangeHandlerTimeSpent.bind(this)} />
                                <label htmlFor="timeSpent" className="">Time Spend</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                            <textarea id="comment" className="materialize-textarea"
                                      value={this.state.comment}
                                      onChange={this.onChangeHandlerComment.bind(this)} />
                                <label htmlFor="comment" className="">Comment</label>
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
                        <span>Complete</span>
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
                }}
            >
                {this.props.trigger}
            </OverlayTrigger>
        )
    }
}
