import { useDispatch } from 'react-redux';
import { changeState } from '../actions/stateActions';
import { State } from '../interfaces/StreamerContext';

const useMode = () => {
  const dispatch = useDispatch();

  const changeMode = (mode: State) => {
    dispatch(changeState(mode));
  };

  return {
    changeMode
  };
};

export default useMode;
