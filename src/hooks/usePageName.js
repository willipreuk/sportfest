import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setPage } from '../actions/navigation';

export default (path) => {
  const dispatch = useDispatch();

  useEffect(() => {
    let name;
    switch (path) {
      case '/disziplinen': name = 'Disziplinen'; break;
      case '/ergebnisse': name = 'Ergebnisse'; break;
      case '/klassen': name = 'Klassen'; break;
      case '/massstaebe': name = 'Maßstäbe'; break;
      case '/schueler': name = 'Schueler'; break;
      case '/user': name = 'User'; break;
      default: name = 'Dashboard';
    }
    dispatch(setPage(name));
  }, [path, dispatch]);
};
