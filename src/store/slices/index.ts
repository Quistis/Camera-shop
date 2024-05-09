import { combineReducers } from 'redux';
import { camerasReducer } from './cameras';
import { NameSpace } from '../../const';

const rootReducer = combineReducers({
  [NameSpace.Cameras]: camerasReducer,
});

export default rootReducer;
