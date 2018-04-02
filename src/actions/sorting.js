export const UPDATE_SORTING = 'UPDATE_SORTING';

export function changeSort({ actualOrder, fieldToOrder }) {
    return {
        type: UPDATE_SORTING,
        payload: {
            actualOrder,
            fieldToOrder
        }
    }
};