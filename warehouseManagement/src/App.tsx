import './App.css';
import styled from 'styled-components';
import axios from 'axios';
import { useEffect } from 'react';
import LayoutContainer from './layout/Layout.container.tsx';
import routes from './routes';
import { useAppDispatch, useAppSelector } from './store';
import { fetchingCategoriesThunk } from './store/reducers/categoryReducer.tsx';
import { getLoggedUser } from './store/reducers/userReducer.tsx';
import { fetchingProductsThunk } from './store/reducers/productReducer.tsx';
import { fetchingWorkersThunk } from './store/reducers/workersReducer.tsx';

const AppWrapper = styled.div`
    width: 80%;
    margin: 0 auto;
    padding: 0;
    overflow: hidden;
    color: #fff;
`;

axios.defaults.withCredentials = true;

const App = () => {
  const dispatch = useAppDispatch();
  const loggedUser = useAppSelector(getLoggedUser);
  useEffect(() => {
    if (loggedUser.email !== '') {
      dispatch(fetchingCategoriesThunk());
      dispatch(fetchingProductsThunk());
      dispatch(fetchingWorkersThunk());
    }
  }, [loggedUser.email]);
  return (
    <AppWrapper>
      <LayoutContainer>
        {routes}
      </LayoutContainer>
    </AppWrapper>
  );
};

export default App;
