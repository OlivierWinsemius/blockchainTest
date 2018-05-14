/* eslint-disable import/no-duplicates */
import React from 'react';
import { connect } from 'react-redux';
import SortableTree from 'react-sortable-tree';
import { getTreeFromFlatData } from 'react-sortable-tree';

class Blockchain extends React.Component {
    state = {
        treeData: getTreeFromFlatData({
            flatData: Object.values(this.props.blockchain.blocks)
                .map(node => ({ ...node, expanded: true })),
            getKey: block => block.hash,
            getParentKey: block => block.parentHash,
            rootKey: this.props.blockchain.blocks.root.hash,
        }),
    }

    setTreeData = treeData => this.setState({ treeData })

    addBlockFrom = parent => () => {
        console.log(parent);
    }

    generateNodeProps = ({ node }) => ({
        buttons: [
            <button key="add" onClick={this.addBlockFrom(node)}>add</button>,
        ],
        node: {
            title: `Block ${node.hash.substr(0, 10)}`,
            subtitle: `Height ${node.height}`,
            children: node.children,
            expanded: node.expanded,
        },
    })

    render() {
        const { treeData } = this.state;

        return (
            <SortableTree
                canDrag={false}
                treeData={treeData}
                onChange={this.setTreeData}
                generateNodeProps={this.generateNodeProps}
            />
        );
    }
}

function mapStateToProps(state) {
    const { blockchain } = state;
    return { blockchain };
}

export default connect(mapStateToProps, null)(Blockchain);
