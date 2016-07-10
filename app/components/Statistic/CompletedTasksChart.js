import React from 'react'
import _ from 'lodash';
import { Chart } from 'react-google-charts'

import TasksStore from "../stores/TasksStore";
import SectionsStore from "../stores/SectionsStore";

export default class CompletedTasksChart extends React.Component{
    constructor(props){
        super();

        let options = {
            title: 'Completed tasks',
            legend: 'none'
        };

        let data = [
            ['Task', 'Completed tasks'],
            ['Completed',  props.completed.length],
            ['Uncompleted', props.tasks.length - props.completed.length]
        ];

        this.state = {
            'data': data,
            'options' : options
        };
    }
    render(){
        return (
            <div className="row">
                <h5>Completed tasks</h5>
                <Chart chartType = "PieChart"
                       data = {this.state.data}
                       options = {this.state.options}
                       width={"100%"}
                       height={"400px"}
                       legend_toggle={true} />
            </div>
        )
    }
}