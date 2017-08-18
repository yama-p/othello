import { connect } from 'react-redux';
import * as actions from '../actions';
import Game from "../components/Game";
import { bindActionCreators } from 'redux';

function mapStateToProps(state) {
  return  {
    gameReducer : state
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
