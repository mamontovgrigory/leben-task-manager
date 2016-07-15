import React from 'react';

class ButtonsStore extends React.Component{
    getList(){
        return [
            {
                id: 1,
                name: 'Create',
                action: 'create'
            },
            {
                id: 2,
                name: 'Statistic',
                action: 'statistic',
                children: [
                    {
                        id: 3,
                        name: 'Statistic',
                        action: 'statistic'
                    },
                    {
                        id: 4,
                        name: 'Pie Chart',
                        action: 'pie-chart'
                    }
                ]
            },
            {
                id: 5,
                name: 'Schedule',
                action: 'schedule'
            },
            {
                id: 6,
                name: 'Map',
                action: 'map'
            },
            {
                id: 7,
                name: 'Filters',
                action: 'filters'
            }
        ];
    }
}

const buttonsStore = new ButtonsStore;
export default buttonsStore;