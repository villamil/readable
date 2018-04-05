import { UPDATE_SORTING } from '../actions/actionsTypes';

const initialSortingState = {
    actualOrder: {
        voteScore: 'asc',
        timestamp: 'asc'
    },
    fieldToOrder: ''
}

export default function sorting(state = initialSortingState, actions) {
    switch (actions.type) {
        case UPDATE_SORTING: {
            const { actualOrder, fieldToOrder } = actions.payload;

            return {
                actualOrder,
                fieldToOrder
            }
        }
        default: {
            return state;
        }
    }
}