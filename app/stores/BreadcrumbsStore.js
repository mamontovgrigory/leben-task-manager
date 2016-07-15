import React from 'react';

import TasksStore from "./TasksStore";
import SectionsStore from "./SectionsStore";

class BreadcrumbsStore extends React.Component{
    constructor(){
        super();
    }
    getList(breadcrumb, params){
        let task = params && params.task ? TasksStore.getItem({ id: params.task }) : {};
        let section = params && params.section ? SectionsStore.getItem({ id: params.section }) : {};
        let matrix = {
            sections: {
                id: 1,
                name: "Sections",
                href: "/sections"
            },
            tasksList: {
                id: 2,
                name: "Section \"" + section.name + "\"",
                href: "/sections/" + section.id + "/list",
                parents: [
                    "sections"
                ]
            },
            sectionStatistic: {
                id: 4,
                name: "Section \"" + section.name + "\" Statistic",
                href: "/sections/" + section.id + "/list/statistic",
                parents: [
                    "sections",
                    "tasksList"
                ]
            },
            statistic: {
                id: 5,
                name: "Total Statistic",
                href: "/sections/statistic",
                parents: [
                    "sections"
                ]
            },
            developing: {
                id: 6,
                name: "Under construction",
                href: "/sections/",
                parents: [
                    "sections"
                ]
            }
        };
        let breadcrumbs = [];
        
        if(breadcrumb && matrix[breadcrumb]){
            if(matrix[breadcrumb].parents){
                for(var i = 0; i < matrix[breadcrumb].parents.length; i++){
                    breadcrumbs.push(matrix[matrix[breadcrumb].parents[i]]);
                }
            }
            breadcrumbs.push(matrix[breadcrumb]);
            return breadcrumbs;
        }else{
            return breadcrumbs;
        }
    }
}

const breadcrumbsStore = new BreadcrumbsStore;
export default breadcrumbsStore;