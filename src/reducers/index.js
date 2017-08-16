import {SQUARE_CLICK, SKIP} from "../actions/GameActions";

const initialState = () => {
    let state = {
        history: [{
            squares: Array(64).fill(null)
        }],
        xIsNext: true,
        stepNumber: 0
    };

    state.history[0].squares[27] = '○';
    state.history[0].squares[28] = '●';
    state.history[0].squares[27+8] = '●';
    state.history[0].squares[28+8] = '○';
    return state;
};

export default function gameReducer(state = initialState(), action) {
    const { type, index } = action;

    switch ( type ) {

        case SQUARE_CLICK:
        {
            const history = state.history.slice(0, state.stepNumber+1);
            const current = history[state.stepNumber];
            const squares = current.squares.slice();
            const i = index;

            console.log("SQUARE_CLICK");

            if (calculateWinner(squares) || squares[i]) {
                return {
                    history: state.history.slice(0, state.stepNumber),
                    xIsNext: state.xIsNext,
                    stepNumber: state.history.length
                };
            }

            squares[i] = state.xIsNext ? '●' : '○';
            const changeSquares = calculateChange(squares, squares[i], i%8, i/8|0);
            if (squares.toString() === changeSquares.toString()) {
                // Object.assign({}, state,
                return {
                    history: state.history.slice(0, state.stepNumber),
                    xIsNext: state.xIsNext,
                    stepNumber: state.history.length
                };
            }

            return {
                history: history.concat([{
                    squares: changeSquares
                }]),
                xIsNext: !state.xIsNext,
                stepNumber: history.length
            };
        }

        case SKIP:
        {
            const history = state.history.slice(0, state.stepNumber+1);
            const current = history[state.stepNumber];
            const squares = current.squares.slice();

            console.log("SKIP");

            return {
                history: history.concat([{
                    squares: squares
                }]),
                xIsNext: !state.xIsNext,
                stepNumber: history.length
            };
        }

        default:
            console.log("default : " + state);
            return state;
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
