// import React from 'react';
import { connect } from 'react-redux';
import * as GameActions from '../actions/GameActions';
import Game from "../components/Game";
import { bindActionCreators } from 'redux';

function mapStateToProps(state) {
    return  {
        gameReducer : state
    };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(GameActions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
