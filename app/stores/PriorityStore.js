class PriorityStore{
    getList(){
        return [
            {
                'id': 1,
                'name': 'lowest'
            },
            {
                'id': 2,
                'name': 'low'
            },
            {
                'id': 3,
                'name': 'medium',
                'default': true
            },
            {
                'id': 4,
                'name': 'high'
            },
            {
                'id': 5,
                'name': 'higher'
            }
        ]
    }
}

const priorityStore = new PriorityStore();
export default priorityStore;