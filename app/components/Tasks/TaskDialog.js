import OverlayTrigger from '.././dialog/OverlayTrigger';
import TasksStore from "../../stores/TasksStore";
import PriorityStore from '../../stores/PriorityStore';

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
    onChangeHandlerDueDate(value){
        this.setState({
            dueDate: value
        });
    }
    onChangeHandlerDescription(e){
        this.setState({
            description: e.target.value
        });
    }
    onChangeHandlerPriority(value){
        this.setState({
            priority: value
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

        //let types = TasksStore.getTypes();
        let priorityList = PriorityStore.getList();
        let priorityDefault = _.filter(priorityList, function(p){
            return p.default === true;
        });
        let priorityDefaultId = priorityDefault && priorityDefault.length ? priorityDefault[0].id : null;
        return(
            <div className="modal modal-fixed-footer" style={{ width: 600 }} {...props}>
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
                                <select name="type" ref="prioritySelect"
                                        value={this.state.priority ? this.state.priority : priorityDefaultId}>
                                    {
                                        priorityList.map((el) => {
                                            return <option key={el.id} value={el.id}>{el.name}</option>
                                        })
                                    }
                                </select>
                                <label htmlFor="type">Priority</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <input id="name" type="text" className="datepicker"
                                       value={this.state.dueDate}
                                       onChange={this.onChangeHandlerDueDate.bind(this)} />
                                <label htmlFor="name">Due Date</label>
                            </div>
                            <div className="input-field col s6">

                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                            <textarea id="description" className="materialize-textarea"
                                      value={this.state.description}
                                      onChange={this.onChangeHandlerDescription.bind(this)} />
                                <label htmlFor="description">Description</label>
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
        var thisClass = this;
        return (
            <OverlayTrigger
                overlay={ this.renderOverlay() }
                callback={ function(){
                    Materialize.updateTextFields();
                    $('.datepicker').datetimepicker({
                        theme:'dark',
                        timepicker: false,
                        format: config.datetimepicker.format,
                        onClose: function(current_time,$input){
                            thisClass.onChangeHandlerDueDate($input.val());
                        }
                    });
                    $('select').material_select();
                    $(ReactDOM.findDOMNode(thisClass.refs.prioritySelect)).on('change', function(){
                        thisClass.onChangeHandlerPriority($(this).val());
                    });
                }}
            >
                {this.props.trigger}
            </OverlayTrigger>
        )
    }
}