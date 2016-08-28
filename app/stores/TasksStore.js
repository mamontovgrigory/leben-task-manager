import React from "react";
import _ from "lodash";

class TasksStore extends React.Component{
    constructor(){
        super();

        var tasks = localStorage.getItem("tasks"); //TODO: Temporary
        try{
            tasks = tasks ? JSON.parse(tasks) : [];
        } catch(err){
            tasks = [];
        }

        this.state = { tasks: tasks };
    }
    getList(section){
        let tasks = section ?
            _.filter(this.state.tasks, function(o) {
                return parseInt(o.section) === parseInt(section);
            }) :
            this.state.tasks;
        return tasks ? _.orderBy(_.map(tasks, function(t){
            return typeof(t.isCompleted) === "boolean" ? t : _.assignIn(t, {
                isCompleted : false
            })
        }), ['isCompleted', 'id'], ['asc', 'asc']) : [];
    }
    getItem(params){
        var task = null;
        if(params){
            var taskKey = _.findKey(this.state.tasks, function(s) {
                var result = true;
                for (var key in params){
                    if(result){
                        result = s[key] == params[key];
                    }
                }
                return result;
            });
            task = this.state.tasks[taskKey];
        }
        return task;
    }
    save(task){
        if(task && task.name){
            var tasks = this.state.tasks;
            if(!task.id){
                task.id = 0;
                for(var i = 0; i < tasks.length; i++){
                    if(!task.id || tasks[i].id + 1 > task.id)
                        task.id = parseInt(tasks[i].id) + 1;
                }
                task.note = 0;
                tasks = _.concat(tasks, [task]);
            } else {
                var taskKey = _.findIndex(tasks, function(s) {
                    return s.id == task.id;
                });
                /*if(task.comment){
                    task.comments = tasks[taskKey].comments ?
                        _.merge(tasks[taskKey].comments, [task.comment]) :
                        [task.comment];
                }*/
                tasks[taskKey] = task;
            }
            this.state.tasks = tasks;
            localStorage.setItem("tasks", JSON.stringify(tasks) ); //TODO: Temporary
        }
    }
    del(taskId){
        var tasks = this.state.tasks;
        _.remove(tasks, function(s) {
            return s.id == parseInt(taskId);
        });
        this.state.tasks = tasks;
        localStorage.setItem("tasks", JSON.stringify(tasks) ); //TODO: Temporary
    }
    getTypes(){
        return [
            {
                id: 1,
                name: "Without deadline"
            },
            {
                id: 2,
                name: "Due date"
            },
            {
                id: 3,
                name: "Regular"
            },
            {
                id: 4,
                name: "Accumulation"
            },
            {
                id: 5,
                name: "Achievement"
            }
        ];
    }
}

const tasksStore = new TasksStore;
export default tasksStore;