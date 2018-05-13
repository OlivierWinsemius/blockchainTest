export default class BlockChain {
    constructor() {
        this.blocks = {};
    }

    longestChain() {
        const { blocks } = this;
        const highestBlock = blocks.reduce(
            (previous, current) => (previous.height > current.height ? previous : current),
            blocks[0],
        );

        const getChain = (block) => {
            if (block.parentHash === undefined) {
                return block;
            }
            return [block, ...getChain(blocks[block.parentHash])];
        };

        return getChain(highestBlock).reverse();
    }

    addBlock(block) {
        this.blocks[block.hash] = block;
    }
}
