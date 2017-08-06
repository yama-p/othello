import {INPUT} from "../actions/GameActions";

const initialState = {
    history: [{
        squares: Array(64).fill(null)
    }],
    xIsNext: true,
    stepNumber: 0
};

export default function gameReducer(state = initialState, action) {
    switch (action.type) {
        case INPUT:
            const history = this.state.history.slice(0, this.state.stepNumber+1);
            const current = history[this.state.stepNumber];
            const squares = current.squares.slice();
            const i = action.index;

            if (calculateWinner(squares) || squares[i]) {
                return state;
            }

            squares[i] = this.state.xIsNext ? '●' : '○';
            const changeSquares = calculateChange(squares, squares[i], i%8, i/8|0);
            if (squares.toString() === changeSquares.toString()) {
                return state;
            }

            return Object.assign({}, state, {
                history: history.concat([{
                    squares: changeSquares
                }]),
                xIsNext: !this.state.xIsNext,
                stepNumber: history.length
            });

        default:
            return state
    }
}

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
