import TaskDialog from './TaskDialog';
import TaskCompleteDialog from './TaskCompleteDialog';
import TasksStore from '../../stores/TasksStore';
import ConfirmDialog from './../dialog/ConfirmDialog';

export default class Task extends React.Component{
    deleteTask(){
        TasksStore.del(this.props.id);
        window.location = '#/sections/' + this.props.section + '/list';
    }
    setCompletion(){
        let task = this.props;
        task.isCompleted = !this.props.isCompleted;

        TasksStore.save(task);
        window.location = '#/sections/' + this.props.section + '/list';
    }
    render(){
        let statusClass = '';
        let icon = 'schedule';
        if(this.props.isCompleted) {
            icon = 'done';
            statusClass = 'success';
        }else if (this.props.dueDate &&
            moment().isAfter(moment(this.props.dueDate, config.moment.format))){
            icon = 'today';
            statusClass = 'danger';
        }
        return (
            <li>
                <div className={'collapsible-header ' + statusClass}>
                    <i className='material-icons'>{icon}</i>{this.props.name}
                </div>
                <div className='collapsible-body'>
                    <div className='section'>
                        {
                            this.props.isCompleted ?
                                <button className={'btn waves-effect waves-light'}
                                        onClick={this.setCompletion.bind(this)}>
                                    <span>Reopen</span>
                                </button>
                                :
                                <TaskCompleteDialog
                                    task={this.props}
                                    section={this.props.section}
                                    trigger={
                                    <button className='btn waves-effect waves-light'>
                                        <span>Complete</span>
                                    </button>
                                } />
                        }
                        <TaskDialog
                            task={this.props}
                            section={this.props.section}
                            trigger={
                                <button className='btn waves-effect waves-light'>
                                    <span>Edit</span>
                                </button>
                            } />
                        <ConfirmDialog
                            header='Are you sure?'
                            confirmCallback={this.deleteTask.bind(this)}
                            trigger={
                                <button className='btn waves-effect waves-light'>
                                    <span>Delete</span>
                                </button>
                            }
                        >
                            <p>Delete task {this.props.name}?</p>
                        </ConfirmDialog>
                        <div className='divider'></div>
                        <div className='section'>
                            {this.props.description}
                        </div>
                    </div>
                </div>
            </li>
        );
    }
}