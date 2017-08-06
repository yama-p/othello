import React from 'react';
import Board from './Board';
import {dispatchInput} from '../actions/GameActions';

class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            history: [{
                squares: Array(64).fill(null)
            }],
            xIsNext: true,
            stepNumber: 0
        };

        this.state.history[0].squares[27] = '○';
        this.state.history[0].squares[28] = '●';
        this.state.history[0].squares[27+8] = '●';
        this.state.history[0].squares[28+8] = '○';
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber+1);
        const current = history[this.state.stepNumber];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? '●' : '○';
        const changeSquares = calculateChange(squares, squares[i], i%8, i/8|0);
        if (squares.toString() === changeSquares.toString()) {
            return;
        }

        this.setState({
            history: history.concat([{
                squares: changeSquares
            }]),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) ? false : true,
        })
    }

    skip() {
        const history = this.state.history.slice(0, this.state.stepNumber+1);
        const current = history[this.state.stepNumber];
        const squares = current.squares.slice();

        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length
        })
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
                (move%2 ? '先手 #' : '後手 #' ) + move :
                'ゲーム開始';
            return (
                <li key={move}>
                    <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
                </li>
            );
        });

        let status;
        if (winner) {
            status = '勝者: ' + winner;
        } else {
            status = '順番: ' + (this.state.xIsNext ? '●' : '○');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current.squares} onClick={(i) => dispatchInput(i)} />
                    {/*<Board squares={current.squares} onClick={(i) => this.handleClick(i)} />*/}
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
                <div className="game-pass">
                    <button className="skip" onClick={() => this.skip()} >
                        順番をパスする
                    </button>
                </div>
            </div>
        );
    }
}

export default Game

function calculateSquares(origin, squares, me, row, col, rowAdd, colAdd) {
    if (row < 0 || col < 0 || row >= 8 || col >= 8) {
        return origin;
    }

    const index = col*8 + row;

    if (!squares[index]) {
        return origin;
    }

    if (me === squares[index]) {
        return squares;
    }

    const squaresCopy = squares.slice();
    squaresCopy[index] = me;

    return calculateSquares(origin, squaresCopy, me, row+rowAdd, col+colAdd, rowAdd, colAdd);
}

function calculateChange(squares, me, row, col) {
    var s = squares.slice();
    s = calculateSquares(s.slice(), s, me, row+1, col, 1, 0);     // →
    s = calculateSquares(s.slice(), s, me, row+1, col+1, 1, 1);   // ↘︎
    s = calculateSquares(s.slice(), s, me, row, col+1, 0, 1);     // ↓
    s = calculateSquares(s.slice(), s, me, row-1, col+1, -1, 1);  // ↙︎
    s = calculateSquares(s.slice(), s, me, row-1, col, -1, 0);    // ←
    s = calculateSquares(s.slice(), s, me, row-1, col-1, -1, -1); // ↖︎
    s = calculateSquares(s.slice(), s, me, row, col-1, 0, -1);    // ↑
    s = calculateSquares(s.slice(), s, me, row+1, col-1, 1, -1);  // ↗︎
    return s;
}

function calculateWinner(squares) {
    var x = 0;
    var o = 0;

    for (let index = 0; index < 8*8; index++) {
        let val = squares[index];
        if (!val) {
            return null;
        } else if (val === '●') {
            x++;
        } else if (val === '○') {
            o++;
        } else {
            return null;
        }
    }

    return x === o ? 'Draw' : (x > o ? '●' : '○');
}
