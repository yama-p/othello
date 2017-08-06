import React from 'react';
import { connect } from 'react-redux';
import * as GameActions from '../actions/GameActions';
import Game from "../components/Game";

function mapStateToProps(state) {
    return  { state };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(GameActions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
