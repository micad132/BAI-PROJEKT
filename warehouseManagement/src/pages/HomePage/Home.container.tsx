import { useAppSelector } from '../../store';
import { getLoggedUser } from '../../store/reducers/userReducer.tsx';
import LoggedUserComponent from './components/LoggedUser.component.tsx';
import ContentTableComponent from './components/ContentTable.component.tsx';
import NotLoggedUserComponent from '../../components/notLoggedUser.component.tsx';

const HomeContainer = () => {
  const loggedUser = useAppSelector(getLoggedUser);
  if (loggedUser.email === '') {
    return (
      <NotLoggedUserComponent />
    );
  }

  return (
    <div style={{ width: 600 }}>
      <LoggedUserComponent loggedUser={loggedUser} />
      <ContentTableComponent />
    </div>
  );
};

export default HomeContainer;
