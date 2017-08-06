import { createAction } from 'redux-actions';

export const INPUT = 'INPUT';

function createPayload(i) {
    return {
        index: i
    }
}

export const dispatchInput = createAction(INPUT, createPayload);
