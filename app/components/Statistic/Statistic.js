import React from 'react';
import _ from 'lodash';

import TasksStore from '../../stores/TasksStore';
import SectionsStore from '../../stores/SectionsStore';

import TasksInSectionsChart from './TasksInSectionsChart';
import CompletedTasksChart from './CompletedTasksChart';

export default class Statistic extends React.Component{
    constructor(props){
        super(props);

        let tasks = TasksStore.getList(props.routeParams ? props.routeParams.section : null);

        this.state = {
            section: props.routeParams ? SectionsStore.getItem({ id: props.routeParams.section }) : null,
            tasks: tasks,
            completed: _.filter(tasks, function(t){
                return t.isCompleted === true;
            })
        }
    }
    componentDidMount(){
        $('ul.tabs').tabs();
    }
    render(){
        return (
            <div className="container">
                <div className="panel row p-24">
                    <div className="row">
                        <div className="col s12">
                            <h5 className="center-align">
                                {this.state.section ? "Section \"" + this.state.section.name + "\" Statistic" : "Total Statistic"}
                            </h5>
                            <ul className="tabs">
                                <li className="tab col s3"><a href="#test1">Total</a></li>
                                <li className="tab col s3"><a className="active" href="#test2">Charts</a></li>
                            </ul>
                        </div>
                    </div>
                    <div id="test1" className="col s12">
                        <h5>Total</h5>
                        <div className="col s12">
                            Section tasks count: {this.state.tasks.length}
                        </div>
                        <div className="col s12">
                            Completed: {this.state.completed.length}
                        </div>
                    </div>
                    <div id="test2" className="col s12">
                        <TasksInSectionsChart section={this.state.section} tasks={this.state.tasks} />
                        <CompletedTasksChart tasks={this.state.tasks} completed={this.state.completed} />
                    </div>
                </div>
            </div>
        )
    }
}