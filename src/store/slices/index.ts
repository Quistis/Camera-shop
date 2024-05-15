import { combineReducers } from 'redux';
import { camerasReducer } from './cameras';
import { reviewsReducer } from './reviews';
import { NameSpace } from '../../const';

const rootReducer = combineReducers({
  [NameSpace.Cameras]: camerasReducer,
  [NameSpace.Reviews]: reviewsReducer,
});

export default rootReducer;
