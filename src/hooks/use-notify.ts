import { useDispatch } from 'react-redux';
import { addNotif, addNotifHistory } from '../actions/notifActions';

const useNotify = () => {
  const dispatch = useDispatch();

  const getTime = () => {
    const now = new Date(Date.now());
    const hour = now.getHours();
    const minute = now.getMinutes();

    return `${hour > 9 ? hour : `0${hour}`}:${minute > 9 ? minute : `0${minute}`}`;
  };

  const notify = (text: string, live: boolean, log: boolean) => {
    dispatch(addNotif({ name: text, live }));
    if (log) {
      dispatch(addNotifHistory({ name: text, live, time: getTime() }));
    }
  };

  return {
    notify
  };
};

export default useNotify;
