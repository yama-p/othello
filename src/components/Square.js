import React from 'react';

function Square(props) {
    return (
        // const { app: { count }, actions: { dispatch1, dispatch2 } } = this.props;
        <button className="square" onClick={() => props.onClick()}>
            {props.value}
        </button>
    );
}

export default Square
