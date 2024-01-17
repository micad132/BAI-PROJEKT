import { useEffect } from 'react';
import { useAppDispatch } from '../../store';
import { setLoggedUser } from '../../store/reducers/userReducer.tsx';

const LogoutPageContainer = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const token = localStorage.getItem('token');
    if (accessToken && refreshToken && token) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('token');
      dispatch(setLoggedUser({
        email: '', name: '', role: '', surname: '', workplace: '',
      }));
    }
  }, []);

  return (
    <div>
      <h1>Pomyślnie wylogowano!</h1>
    </div>
  );
};

export default LogoutPageContainer;
