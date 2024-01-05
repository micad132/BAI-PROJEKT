import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { getLoggedUser } from '../../store/reducers/userReducer.tsx';
import LoggedUserComponent from './components/LoggedUser.component.tsx';
import ContentTableComponent from './components/ContentTable.component.tsx';
import { fetchingCategoriesThunk } from '../../store/reducers/categoryReducer.tsx';

const HomeContainer = () => {
  const dispatch = useAppDispatch();
  const loggedUser = useAppSelector(getLoggedUser);
  useEffect(() => {
    dispatch(fetchingCategoriesThunk());
  }, [dispatch]);
  return (
    <div>
      <LoggedUserComponent username={loggedUser.username} />
      <ContentTableComponent />
    </div>
  );
};

export default HomeContainer;
