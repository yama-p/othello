import { createAction } from 'redux-actions';

export const INC = 'INC';
export const DEC = 'DEC';

export const dispatch1 = createAction(INC);
export const dispatch2 = createAction(DEC);
