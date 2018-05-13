import { sha256 } from 'js-sha256';

export default class Block {
    constructor(
        chain,
        parentHash,
        nonce = sha256(new Date().getTime().toString()).toString(),
    ) {
        this.chain = chain;
        this.parentHash = parentHash;
        this.nonce = nonce;
        this.hash = sha256(nonce + parentHash);
    }
}
