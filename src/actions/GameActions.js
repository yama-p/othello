// import { createAction } from 'redux-actions';

export const SQUARE_CLICK = 'SQUARE_CLICK';
export const SKIP = 'SKIP';

export function actionSquareClick(index) {
    return {
        type: SQUARE_CLICK,
        index: index
    }
}

export function actionSkip() {
    return {
        type: SKIP
    }
}

