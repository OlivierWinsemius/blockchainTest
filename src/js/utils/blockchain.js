/* eslint-disable import/prefer-default-export */
import { sha256 } from 'js-sha256';

function getChain(blocks, highestBlock) {
    if (highestBlock.parentHash === undefined) {
        return highestBlock;
    }
    return [highestBlock, ...getChain(blocks[highestBlock.parentHash])];
}

export class Block {
    constructor(parent) {
        this.parentHash = parent && parent.hash;
        this.height = parent ? parent.height + 1 : 0;
        this.nonce = sha256(Math.random().toString(36).substring(7)).toString();
        this.hash = this.parentHash ? sha256(this.nonce + this.parentHash) : 'root';
    }
}

export function longestChain(blocks) {
    return getChain(
        blocks,
        blocks.reduce(
            (previous, current) =>
                (previous.height > current.height ?
                    previous :
                    current),
            blocks[0],
        ),
    ).reverse();
}
