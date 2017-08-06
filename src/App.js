import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators1 from './actionCreators1';

class App extends Component {
    render() {
        const { app: { count }, actions: { dispatch1, dispatch2 } } = this.props;
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to React</h2>
                </div>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <button onClick={ e => dispatch1()}>INC: { count }</button>
                <button onClick={ e => dispatch2()}>DEC: { count }</button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return  { app: state.app };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actionCreators1, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
