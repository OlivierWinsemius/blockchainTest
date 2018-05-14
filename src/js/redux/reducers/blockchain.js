import actionTypes from '../types/blockchain';
import { Block } from '../../utils/blockchain';

const initialState = {
    blocks: {
        root: new Block(),
    },
};

initialState.blocks = {
    ...initialState.blocks,
    a: new Block(initialState.blocks.root),
};

initialState.blocks = {
    ...initialState.blocks,
    b: new Block(initialState.blocks.a),
};

initialState.blocks = {
    ...initialState.blocks,
    c: new Block(initialState.blocks.b),
};

export default (state = initialState, action) => {
    switch (action.type) {
    case actionTypes.ADD_BLOCK:
        return {
            ...state,
            blocks: {
                ...state.blocks,
                [action.payload.hash]: action.payload.block,
            },
        };
    default:
        return state;
    }
};
