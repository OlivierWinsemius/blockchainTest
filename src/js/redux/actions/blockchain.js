/* eslint-disable import/prefer-default-export */
import actionTypes from '../types/blockchain';

export function ADD() {
    return {
        type: actionTypes.ADD_BLOCK,
        payload: {},
    };
}
