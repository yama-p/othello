import React from 'react';
import Board from './Board';

class Game extends React.Component {

    handleClick(index) {
        this.props.actions.actionSquareClick(index);
    }

    jumpTo(step) {
        this.props.actions.actionJumpStep(step);
    }

    skip() {
        this.props.actions.actionSkip();
    }

    render() {
        const { gameReducer : { history, xIsNext, stepNumber } } = this.props;
        const current = history[stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
                (move%2 ? '先手 #' : '後手 #' ) + move :
                'ゲーム開始';
            return (
                <li key={move}>
                    <a href="##" onClick={() => this.jumpTo(move)}>{desc}</a>
                </li>
            );
        });

        let status;
        if (winner) {
            status = '勝者: ' + winner;
        } else {
            status = '順番: ' + (xIsNext ? '●' : '○');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current.squares} onClick={(i) => this.handleClick(i)} />
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

function calculateWinner(squares) {
    let x = 0;
    let o = 0;

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
