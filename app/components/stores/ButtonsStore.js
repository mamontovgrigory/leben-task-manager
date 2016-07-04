import React from 'react';

class ButtonsStore extends React.Component{
    getList(){
        return [
            {
                id: 1,
                name: 'Create',
                action: 'create',
                requiredTile: false
            },
            {
                id: 2,
                name: 'Statistic',
                action: 'statistic',
                requiredTile: false
            },
            {
                id: 3,
                name: 'Schedule',
                action: 'schedule',
                requiredTile: false
            },
            {
                id: 4,
                name: 'Map',
                action: 'map',
                requiredTile: false
            },
            {
                id: 5,
                name: 'Filters',
                action: 'filters',
                requiredTile: false
            }
        ];
    }
}

const buttonsStore = new ButtonsStore;
export default buttonsStore;