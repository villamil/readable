import { UPDATE_SORTING } from './actionsTypes';

export function changeSort({ actualOrder, fieldToOrder }) {
    return {
        type: UPDATE_SORTING,
        payload: {
            actualOrder,
            fieldToOrder
        }
    }
};