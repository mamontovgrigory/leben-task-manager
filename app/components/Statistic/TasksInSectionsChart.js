import React from 'react'
import _ from 'lodash';
import { Chart } from 'react-google-charts'

import TasksStore from "../stores/TasksStore";
import SectionsStore from "../stores/SectionsStore";

export default class TasksInSectionsChart extends React.Component{
    constructor(){
        super();

        let options = {
            title: 'Sections tasks',
            legend: 'none'
        };

        let data = [
            ['Task', 'Tasks in Section']
        ];

        let tasks = TasksStore.getList();
        let sections = SectionsStore.getList();
        for(var i = 0; i < sections.length; i++){
            data.push([
                sections[i].name,
                _.filter(tasks, function(t){
                    return parseInt(t.section) === parseInt(sections[i].id);
                }).length
            ]);
        }

        this.state = {
            'data': data,
            'options' : options
        };
    }
    render() {
        return (
            <div className="row">
                <h5>Tasks count in sections</h5>
                <Chart chartType = "PieChart"
                       data = {this.state.data}
                       options = {this.state.options}
                       graph_id = "PieChart"
                       width={"100%"}
                       height={"400px"}
                       legend_toggle={true} />
            </div>
        )
    }
}