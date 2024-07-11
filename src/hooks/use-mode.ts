import { useDispatch, useSelector } from 'react-redux';
import { changeState } from '../actions/stateActions';
import { State } from '../interfaces/StreamerContext';
import { RootState } from '../reduxStore';

const useMode = () => {
  const state = useSelector((state: RootState) => state.state.state);
  const dispatch = useDispatch();

  const changeMode = (mode: State) => {
    dispatch(changeState(mode));
  };

  return {
    changeMode,
    mode: state
  };
};

export default useMode;
