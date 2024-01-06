import styled from 'styled-components';
import { useAppSelector } from '../../store';
import { getLoggedUser } from '../../store/reducers/userReducer.tsx';
import LoggedUserComponent from './components/LoggedUser.component.tsx';
import ContentTableComponent from './components/ContentTable.component.tsx';

const NotLoggedUserComponentWrapper = styled.div`
  background-color: red;
  color: #fff;
  padding: 10px 20px;
  font-weight: bold;
`;

const HomeContainer = () => {
  const loggedUser = useAppSelector(getLoggedUser);
  if (loggedUser.email === '') {
    return (
      <NotLoggedUserComponentWrapper>
        Nie jesteś zalogowany!
      </NotLoggedUserComponentWrapper>
    );
  }

  return (
    <div>
      <LoggedUserComponent loggedUser={loggedUser} />
      <ContentTableComponent />
    </div>
  );
};

export default HomeContainer;
