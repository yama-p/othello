import React from 'react';
import Square from './Square'

class Board extends React.Component {
    renderSquare(i) {
        return <Square key={i} value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />;
    }

    boardRowRender(rowNum, col) {
        let arr = [];
        for (let step = 0; step < rowNum; step++) {
            arr.push(this.renderSquare(col*rowNum  + step));
        }
        return (
            <div key={col} className="board-row">
                {arr}
            </div>
        );
    }

    render() {
        const rowNum = 8;
        const colNum = 8;

        let arr = [];
        for (let step = 0; step < colNum; step++) {
            arr.push(this.boardRowRender(rowNum, step));
        }

        return (
            <div>
                {/*<div className="status">{status}</div>*/}
                {arr}
            </div>
        );
    }
}

export default Board