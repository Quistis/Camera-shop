import { combineReducers } from 'redux';
import { camerasReducer } from './cameras';
import { reviewsReducer } from './reviews';
import { promosReducer } from './promos';
import { NameSpace } from '../../const';

const rootReducer = combineReducers({
  [NameSpace.Cameras]: camerasReducer,
  [NameSpace.Reviews]: reviewsReducer,
  [NameSpace.Promos]: promosReducer,
});

export default rootReducer;
